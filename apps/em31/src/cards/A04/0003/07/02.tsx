import {
  BottomSheet,
  Box,
  BoxWrap,
  Drawing,
  EStyleButtonTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A04_0003_07 } from './store';
import usePageData from '@/hooks/usePageData';
import { useEffect, useState, useRef } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [cardData, setCardData] = useRecoilState(A04_0003_07);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const { initData, submitData, saveData, changeData } = usePageData();
  const canvasRef = useRef<ICanvasFunction>(null);
  const pageKey = 'p02';
  const pageNumber = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제를 풀고 주어진 식으로 문제를 만들어 해결해 보세요.',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        21×4를 이용하여 풀 수 있는 문제를 만들고 해결해 보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'CANVAS',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], canvasDataURL: canvasDataURL } }));
        changeData(pageNumber, 1, 1, canvasDataURL);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasDataURL,
            answer: userSubmissionList[0].inputData[1]?.value || '',
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData[pageKey].canvasDataURL));
        }
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(show => !show);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], canvasDataURL: canvasDataURL, isSubmitted: true } }));
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'CANVAS',
              value: canvasDataURL,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer.trim(),
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNumber, 1, 2, value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData[pageKey].isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData[pageKey].answer.trim()}
      submitBtnColor={
        cardData[pageKey].answer.trim() ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap marginTop='10px' flex='1'>
        <Box marginRight='10px' marginTop='40px'>
          <Label
            value='문제'
            color='var(--color-yellow-800)'
            background='var(--color-yellow-100)'
            lineColor='var(--color-yellow-700)'
            svgWidth={100}
          />
        </Box>
        <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData[pageKey].isSubmitted} />
      </BoxWrap>
      <Box display='flex' justifyContent='right' alignItems='center' marginTop='10px'>
        <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
        <Input
          value={cardData[pageKey].answer}
          onChange={e => handleChange(e.target.value)}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            !isNotEmptyString(cardData[pageKey].answer)
              ? InputStatus.DEFAULT
              : cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer, cardData[pageKey].solution)
              ? InputStatus.ENABLE
              : InputStatus.ENABLE
          }
          ariaLabel='답란'
          marginLeft={8}
          maxLength={30}
          width='292px'
        />
      </Box>
      <BottomSheet
        height={'50%'}
        show={showAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'10px'}>
              <Typography lineHeight='normal'>
                문제: 하늘 초등학교 3학년은 한 반에 21명씩 4반입니다. 하늘 초등학교 3학년 학생은 모두 몇 명인가요?
              </Typography>
              <Typography lineHeight='normal'>답: 84명</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
