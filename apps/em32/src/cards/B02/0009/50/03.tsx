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

const P03 = () => {
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
    const canvasDataURL = canvasRef.current?.getValue();
    if (canvasDataURL) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, canvasDataURL: canvasRef.current?.isCanvasBlank() ? '' : canvasDataURL } }));
      changeData('P03', 1, 2, canvasRef.current?.isCanvasBlank() ? '' : canvasDataURL);
    }
  };

  const submitAnswer = async () => {
    if (cardData.P03.isSubmitted) {
      setShow(!isShow);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();

      const isCorrect = cardData.P03.answer === cardData.P03.solution;
      const data = cardData.P03;
      setCardData(prev => ({
        ...prev,
        P03: {
          ...prev.P03,
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
            canvasDataURL: userSubmissionList[0].inputData[2]?.value || cardData.P03.canvasDataURL,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
        //canvas image load
        if (userSubmissionList[0].inputData[1]?.value || cardData.P03.canvasDataURL) {
          if (userSubmissionList[0].inputData[1]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.P03.canvasDataURL));
        }
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
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
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.P03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P03.answer}
      submitBtnColor={!cardData.P03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
    >
      <Box useFull justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Question type='number' number='3' mark={cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none'}>
          가장 큰 원의 반지름은 몇 cm인가요?
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
            <Drawing ref={canvasRef} disabled={cardData.P03.isSubmitted} tmpSave={tmpSaveCanvas} />
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
            />{' '}
            <Input
              width='217px'
              textAlign='center'
              value={cardData.P03.answer}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.P03.isSubmitted}
              status={cardData.P03.isSubmitted && cardData.P03.answer.trim() !== cardData.P03.solution ? 'error' : ''}
              placeholder=''
              ariaLabel='답란'
              type='number'
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'10'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'예) 가장 큰 원의 지름이 20cm이므로 반지름은 20÷2=10 (cm)입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
