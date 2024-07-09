import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
  Scroll,
} from '@maidt-cntn/ui';
import { Container, DropZone } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP01_1 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P11 = ({ _page = 'P11' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_1);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '음원을 듣고 단어를 알맞게 배열하여 빈칸에 들어갈 문장을 완성해 봅시다. ',
    mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P11.mp3',
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
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P11: {
            ...prev.P11,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P11.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const chipButtonOnClick = (index: number) => {
    if (cardData.P11.isSubmitted) return;

    const updatedAnswer = cardData.P11.answer.includes(index)
      ? cardData.P11.answer.filter(value => value !== index)
      : [...cardData.P11.answer, index];

    setCardData(prev => ({
      ...prev,
      P11: {
        ...prev.P11,
        answer: updatedAnswer,
      },
    }));

    changeData(_page.toUpperCase(), 1, 1, updatedAnswer);
  };

  const resetButtonOnClick = () => {
    if (cardData.P11.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      P11: {
        ...prev.P11,
        answer: [],
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = cardData.P11.solution.map((chip, index) => ({
      ...chip,
      isError: cardData.P11.answer.includes(index) && cardData.P11.solution[index].answer !== cardData.P11.answer.indexOf(index),
    }));

    const isCorrectAll = cardData.P11.answer.every((index, idx) => cardData.P11.solution[index].answer === idx);

    setCardData(prev => ({
      ...prev,
      P11: {
        ...prev.P11,
        solution: newChipButtonInfo,
        isCorrect: isCorrectAll,
      },
    }));
  }, [cardData.P11.answer]);

  const handleSubmit = useCallback(() => {
    if (cardData.P11.isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, P11: { ...prev.P11, isSubmitted: true } }));

      const isCorrectAll = cardData.P11.answer.every((index, idx) => cardData.P11.solution[index].answer === idx);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.P11.answer,
              isAnswer: true,
              isCorrect: isCorrectAll,
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrectAll);
    }
  }, [cardData.P11.isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.P11.isSubmitted) {
      return false;
    }

    return cardData.P11.answer.length !== cardData.P11.solution.length;
  }, [cardData.P11.isSubmitted, cardData.P11.answer]);

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
      saveData(_page.toUpperCase());
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (cardData.P11.isSubmitted) {
      checkAnswer();
    }
  }, [cardData.P11.isSubmitted]);

  useEffect(() => {
    if (cardData.P11.isSubmitted) {
      setMark(cardData.P11.isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.P11.isSubmitted, cardData.P11.isCorrect]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isAnswerShow ? '답안 닫기' : cardData.P11.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' marginRight={8} />
            </Box>
            <Typography>Grandpa! I heard you’re going to Italy next week!</Typography>
          </Box>
          <Box display='flex' paddingTop={10}>
            <Box>
              <Label value='M' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Box>
              <Box>
                <Typography>Yes, I’m so excited, but I’m worried about ordering food.</Typography>
              </Box>
              <Box marginLeft={20}>
                <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)'></Typography>
                <Typography>?</Typography>
              </Box>
            </Box>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        chipButtonInfo={cardData.P11.solution}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.P11.answer}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>What if the menu is written only in Italian</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>여: 할아버지! 다음 주에 이탈리아에 가신다고 들었어요!</Typography>
            <Typography>남: 응, 정말 기대가 되지만 음식을 주문하는 게 걱정이란다. 메뉴가 이탈리아어로만 쓰여 있으면 어떡하지?</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
