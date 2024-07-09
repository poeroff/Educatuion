import usePageData from '@/hooks/usePageData';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
import { C01_0005_20 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0005_20);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const submitBtnColor = cardData.p02.isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.YELLOW;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={1} type='icon' size='small' />수 모형을 보고 389-243 를 구해 보세요 .
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: target.value } }));
    changeData('P02', 1, 1, target.value);
  };
  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p02.answer.toLowerCase().trim() === cardData.p02.solution);
      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect: cardData.p02.answer.toLowerCase().trim() === cardData.p02.solution },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
              isAnswer: true,
            },
          ],
          isCorrect: cardData.p02.answer.toLowerCase().trim() === cardData.p02.solution,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);
  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p02.answer === ''}
      background={'var(--color-white)'}
      useRound
      bodyId='targetContainer'
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/C01/0005/20/EC31104.png'
            alt='백 모형 3 개 , 십
모형 8 개 , 일 모형 9 개가
있습니다 . 이 중 백 모형 2 개 ,
십 모형 4 개 , 일 모형 3 개에 X
표가 있습니다 '
            width='400px'
            height='200px'
          />
        </Box>
        <Box marginTop='24px'>
          <Typography>389-243=</Typography>
          <Input
            ariaLabel='2번 답란'
            readOnly={cardData.p02.isSubmitted}
            width='95px'
            maxLength={3}
            name='value2'
            value={cardData.p02.answer}
            marginLeft={10}
            status={
              !cardData.p02.isSubmitted
                ? cardData.p02.answer.trim() === ""
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p02.answer.trim() === ""
                ? InputStatus.ENABLE
                : cardData.p02.answer.trim() !== cardData.p02.solution
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            onChange={handleInputChangeEvent}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>146</Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            수 모형 389에서 243만큼 X표 하고 남은 수 모형을 세어 보면 백 모형이 1개, 십 모형이 4개, 일 모형이 6개이므로 389-243=146입니다.
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
