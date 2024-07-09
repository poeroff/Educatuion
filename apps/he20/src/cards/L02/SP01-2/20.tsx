import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP01_2 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P20 = () => {
  const PAGE_NUMBER = 'P20';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-2/HE2-L02-SP01-2-P20.mp3',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p20: {
            ...prev.p20,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p20.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const chipButtonOnClick = (index: number) => {
    if (cardData.p20.isSubmitted) return;

    const updatedAnswer = cardData.p20.answer.includes(index)
      ? cardData.p20.answer.filter(value => value !== index)
      : [...cardData.p20.answer, index];

    setCardData(prev => ({
      ...prev,
      p20: {
        ...prev.p20,
        answer: updatedAnswer,
      },
    }));

    changeData(PAGE_NUMBER, 1, 1, updatedAnswer);
  };

  const resetButtonOnClick = () => {
    if (cardData.p20.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p20: {
        ...prev.p20,
        answer: [],
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = cardData.p20.solution.map((chip, index) => ({
      ...chip,
      isError: cardData.p20.answer.includes(index) && cardData.p20.solution[index].answer !== cardData.p20.answer.indexOf(index),
    }));

    const isCorrectAll = cardData.p20.answer.every((index, idx) => cardData.p20.solution[index].answer === idx);

    setCardData(prev => ({
      ...prev,
      p20: {
        ...prev.p20,
        solution: newChipButtonInfo,
        isCorrect: isCorrectAll,
      },
    }));
  }, [cardData.p20.answer]);

  const handleSubmit = useCallback(() => {
    if (cardData.p20.isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, p20: { ...prev.p20, isSubmitted: true } }));

      const isCorrectAll = cardData.p20.answer.every((index, idx) => cardData.p20.solution[index].answer === idx);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p20.answer,
              isAnswer: true,
              isCorrect: isCorrectAll,
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];

      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
    }
  }, [cardData.p20.isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p20.isSubmitted) {
      return false;
    }

    return cardData.p20.answer.length !== cardData.p20.solution.length;
  }, [cardData.p20.isSubmitted, cardData.p20.answer]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (isAnswerShow) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, isAnswerShow]);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (cardData.p20.isSubmitted) {
      checkAnswer();
    }
  }, [cardData.p20.isSubmitted]);

  useEffect(() => {
    if (cardData.p20.isSubmitted) {
      setMark(cardData.p20.isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p20.isSubmitted, cardData.p20.isCorrect]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isAnswerShow ? '답안 닫기' : cardData.p20.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='20px' useRound background='white' padding='10px'>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex' alignItems='end'>
                <Typography>The GREEN PLUS skin-care set usually sells for 40 dollars.</Typography>
              </Box>

              <Box>
                <Typography>But, order now and</Typography>
                <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)'></Typography>.
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <DropZone
        chipButtonInfo={cardData.p20.solution}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p20.answer}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>you can receive the entire set for only 30 dollars</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>
              여: GREEN PLUS 피부관리 세트는 보통 40달러에 판매됩니다. 그러나 지금 주문하시면 전체 세트를 단 30달러에 받으실 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P20;
