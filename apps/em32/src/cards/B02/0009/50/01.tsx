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
  ICanvasFunction,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B02000950_store } from './store';
import B02000950Contents from './components/B02000950Contents';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B02000950_store);
  const canvasRef = useRef<ICanvasFunction>(null);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <B02000950Contents />,
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P01: {
            ...prev.P01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P01.answer,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.P01.canvasDataURL,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));

        //canvas image load
        if (userSubmissionList[0].inputData[1]?.value || cardData.P01.canvasDataURL) {
          if (userSubmissionList[0].inputData[1]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.P01.canvasDataURL));
        }
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const tmpSaveCanvas = async () => {
    const canvasDataURL = canvasRef.current?.getValue();
    if (canvasDataURL) {
      setCardData(prev => ({ ...prev, P01: { ...prev.P01, canvasDataURL: canvasRef.current?.isCanvasBlank() ? '' : canvasDataURL } }));
      changeData('P01', 1, 2, canvasRef.current?.isCanvasBlank() ? '' : canvasDataURL);
    }
  };

  const submitAnswer = async () => {
    if (cardData.P01.isSubmitted) {
      setShow(!isShow);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();

      const isCorrect = cardData.P01.answer[0] === cardData.P01.solution[0] && cardData.P01.answer[1] === cardData.P01.solution[1];
      const data = cardData.P01;

      setCardData(prev => ({
        ...prev,
        P01: {
          ...prev.P01,
          canvasDataURL: canvasDataURL ?? '',
          isSubmitted: true,
          isCorrect: isCorrect,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: data.answer,
              isAnswer: true,
              isCorrect,
            },
            {
              subKey: 2,
              type: 'CANVAS',
              value: canvasDataURL ?? '',
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const handleChange = (subKey: number, idx: number, value: string) => {
    const newAnswers = [...cardData.P01.answer];
    newAnswers[idx] = value;
    setCardData(prev => ({ ...prev, P01: { ...prev.P01, answer: newAnswers } }));
    changeData('P01', 1, subKey, newAnswers);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.P01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P01.answer[0] || !cardData.P01.answer[1]}
      submitBtnColor={!cardData.P01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
    >
      <Box useFull justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Question type='number' number='1' mark={cardData.P01.isSubmitted ? (cardData.P01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
          가장 작은 원과 중간 크기 원의 지름을 각각 구해 보세요.
        </Question>
        <BoxWrap>
          <Box marginRight='10px' paddingTop={40} display='inline-flex' fontSize='var(--font-size-28)'>
            <Label
              value='&nbsp;풀이&nbsp;'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
            />
          </Box>
          <Box height='175px' flex={1}>
            <Drawing ref={canvasRef} disabled={cardData.P01.isSubmitted} tmpSave={tmpSaveCanvas} />
          </Box>
        </BoxWrap>
        <BoxWrap justifyContent='flex-end'>
          <Box hAlign='center' marginTop='8px'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Typography>{' 가장 작은 원 : '}</Typography>
            <Input
              width='157px'
              textAlign='center'
              value={cardData.P01.answer[0]}
              onChange={event => handleChange(1, 0, event.target.value)}
              readOnly={cardData.P01.isSubmitted}
              status={cardData.P01.isSubmitted && cardData.P01.answer[0].trim() !== cardData.P01.solution[0] ? 'error' : ''}
              placeholder=''
              ariaLabel='1번 답란'
              type='number'
            />
            <Typography>{'cm, 중간 크기 원 : '}</Typography>
            <Input
              width='157px'
              textAlign='center'
              value={cardData.P01.answer[1]}
              onChange={event => handleChange(1, 1, event.target.value)}
              readOnly={cardData.P01.isSubmitted}
              status={cardData.P01.isSubmitted && cardData.P01.answer[1].trim() !== cardData.P01.solution[1] ? 'error' : ''}
              placeholder=''
              ariaLabel='2번 답란'
              type='number'
            />
            <Typography>{'cm'}</Typography>
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'4, 16'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'예) 가장 작은 원의 지름은 2×2=4 (cm)이고, 중간 크기 원의 지름은 8×2=16 (cm)입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
