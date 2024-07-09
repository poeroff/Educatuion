import {
  Box,
  BoxWrap,
  IQuestionProps,
  Input,
  Label,
  Typography,
  Drawing,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01001110_store } from './store';

const P03 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01001110_store);
  const canvasRef = useRef<ICanvasFunction>(null);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathDescriptive',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Box>
          <Box vAlign='center'>가장 큰 수와 가장 작은 수의 합에서 나머지 한 수를 뺀 값은 얼마인지 풀이 과정을 쓰고 답을 구해 보세요. </Box>
        </Box>
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'CANVAS',
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
        setCardData(prev => ({ ...prev, P03: { ...prev.P03, canvasDataURL: canvasDataURL } }));
        changeData('P03', 1, 2, canvasDataURL);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P03: {
            ...prev.P03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P03.answer,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.P03.canvasDataURL,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));

        if (userSubmissionList[0].inputData[1]?.value || cardData.P03.canvasDataURL) {
          if (userSubmissionList[0].inputData[1]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.P03.canvasDataURL));
        }
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    if (cardData.P03.isSubmitted) {
      setShow(!isShow);
    } else {
      const data = cardData.P03;
      const isCorrect = cardData.P03.answer === cardData.P03.solution;
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, P03: { ...prev.P03, canvasDataURL: canvasDataURL, isSubmitted: true, isCorrect: isCorrect } }));
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: data.answer,
              isAnswer: true,
              isCorrect,
            },
            {
              subKey: 2,
              type: 'CANVAS',
              value: canvasDataURL,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitData('P03', userSubmission);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.P03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P03.answer}
      submitBtnColor={!cardData.P03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useFull justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Box type='line' hAlign='center' display='flex' justifyContent='center' marginBottom='15px' height={80} useRound borderWidth={3}>
          <Typography>295</Typography>
          <Typography>652</Typography>
          <Typography>478</Typography>
        </Box>
        <Box vAlign='center'>
          <Box display='flex' alignItems='center'>
            <Label type='icon' size='small' value={3} />
          </Box>
          <Typography>가장 큰 수와 가장 작은 수의 합에서 나머지 한 수를 뺀 값을 구해 보세요.</Typography>
        </Box>
        <BoxWrap marginTop='10px' flex='1'>
          <Box marginRight='10px'>
            <Label
              value='풀이'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              svgWidth={100}
            />
          </Box>
          <Box useFull>
            <Drawing width='800px' height='115px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.P03.isSubmitted} />
          </Box>
        </BoxWrap>
        <BoxWrap justifyContent='flex-end' marginTop='24px'>
          <Box>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              marginLeft={12}
              value={cardData.P03.answer}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.P03.isSubmitted}
              status={cardData.P03.isSubmitted && cardData.P03.answer.trim() !== cardData.P03.solution ? 'error' : ''}
              placeholder=''
              ariaLabel='답란'
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='200px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'469'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'예) 가장 큰 수와 가장 작은 수를 제외한 나머지 한 수는 478입니다.'}</Typography>
              <Typography>{'따라서 947에서 478을 뺀 값은 947-478=469입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
