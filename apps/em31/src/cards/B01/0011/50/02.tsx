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
  EStyleFontSizes,
  TextView,
  ICanvasFunction,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01001150_store } from './store';

const P02 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01001150_store);
  const canvasRef = useRef<ICanvasFunction>(null);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box>
          <Box vAlign='baseline' fontSize={28}>
            ㉠과 ㉡이 나타내는 수의 합은 얼마인지 풀이 과정을 쓰고 답을 구해 보세요.
          </Box>
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
        setCardData(prev => ({ ...prev, P02: { ...prev.P02, canvasDataURL: canvasDataURL } }));
        changeData('P02', 1, 2, canvasDataURL);
      }
    }
  };

  const submitAnswer = async () => {
    if (cardData.P02.isSubmitted) {
      setShow(!isShow);
    } else {
      const data = cardData.P02;
      const isCorrect = cardData.P02.answer === cardData.P02.solution;
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, P02: { ...prev.P02, canvasDataURL: canvasDataURL, isSubmitted: true, isCorrect: isCorrect } }));
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
      submitData('P02', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.P02.canvasDataURL,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));

        if (userSubmissionList[0].inputData[1]?.value || cardData.P02.canvasDataURL) {
          if (userSubmissionList[0].inputData[1]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.P02.canvasDataURL));
        }
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: value } }));
    }
    changeData('P02', 1, subKey, value);
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
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.P02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P02.answer}
      submitBtnColor={!cardData.P02.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
    >
      <Box useFull justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Box display='flex' justifyContent='center' marginBottom={30} height={80}>
          <TextView title='' hAlign='start'>
            <Typography size={EStyleFontSizes.SMALL}>㉠ 100이 6개, 10이 4개, 1이 3개인 수</Typography>
            <Typography size={EStyleFontSizes.SMALL}>㉡ 100이 2개, 10이 8개, 1이 18개인 수</Typography>
          </TextView>
        </Box>
        <Question type='number' number='2' mark={cardData.P02.isSubmitted ? (cardData.P02.isCorrect ? 'correct' : 'incorrect') : 'none'}>
          ㉡이 나타내는 수를 구해 보세요.
        </Question>
        <Box hAlign='center'>
          <Box vAlign='baseline' flexDirection='column' marginTop='24px'>
            <Label
              value={'식'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />{' '}
          </Box>
          <Box useFull>
            <Drawing width='888px' height='175px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.P02.isSubmitted} />
          </Box>
        </Box>
        <BoxWrap justifyContent='flex-end'>
          <Box hAlign='center' marginTop='8px'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />{' '}
            <Input
              width='217px'
              textAlign='center'
              value={cardData.P02.answer}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.P02.isSubmitted}
              status={cardData.P02.isSubmitted && cardData.P02.answer.trim() !== cardData.P02.solution ? 'error' : ''}
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
              <Typography>{'298'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'예) 100이 2개, 10이 8개, 1이 18개인 수는 100이 2개, 10이 9개, 1이 8개인 수와 같으므로 298입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
