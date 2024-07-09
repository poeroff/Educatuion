import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Tag, TMainHeaderInfoTypes, TMarkType, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03SP04_2 } from './store';

const P11 = () => {
  const PAGE_NUMBER = 'P11';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>([]);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP04_2);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'does',
      isError: false,
    },
    {
      text: 'eat something',
      isError: false,
    },
    {
      text: 'she',
      isError: false,
    },
    {
      text: 'Seldom',
      isError: false,
    },
    {
      text: 'late at night',
      isError: false,
    },
  ]);
  
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: true,
          isCorrect,
        },
      ],
      isCorrect,
    },
  ];

  const answer = 'Seldom does she eat something late at night';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 영작 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '단어카드를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    markSize: 'middle',
    mark: mark,
  };


  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    setIsSubmitted(cardData.p11.isSubmitted);
    setIsCorrect(cardData.p11.isCorrect);
    if (cardData.p11.isSubmitted) {
      setMark(cardData.p11.isCorrect ? 'correct' : 'incorrect');
    }

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p11.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p11: {
            ...prev.p11,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
      setIsSubmitted(isSubmitted);
      setIsCorrect(defaultIsCorrect);
      if (isSubmitted) {
        setMark(defaultIsCorrect ? 'correct' : 'incorrect');
        setClickedChipButtons(defaultAnswer);
        answerCardErrorMark(defaultAnswer);
      }
    } else {
      if (cardData.p11.isSubmitted) {
        setIsSubmitted(cardData.p11.isSubmitted);
        setIsCorrect(cardData.p11.isCorrect);
        answerCardErrorMark(cardData.p11.answer);
        setMark(cardData.p11.isCorrect ? 'correct' : 'incorrect');
      }
    }
  };

  const answerCardErrorMark = (answers: number[]) => {
    answers.map((v, i) => {
      if (cardData.p11.solution[i] !== v) {
        setChipButtonInfo(prev =>
          prev.map((info, index) => {
            if (index === v) {
              info.isError = true;
            }
            return info;
          }),
        );
      } else {
        setChipButtonInfo(prev =>
          prev.map((info, index) => {
            if (index === v) {
              info.isError = false;
            }
            return info;
          }),
        );
      }
    });
  };

  const chipButtonOnClick = (index: number) => {
    if (isSubmitted) return;

    if (clickedChipButtons.includes(index)) {
      setClickedChipButtons(prev => prev.filter(value => value !== index));
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, answer: prev.p11.answer.filter(value => value !== index) } }));
      changeData(
        PAGE_NUMBER, 1, 1, cardData.p11.answer.filter(value => value !== index),
      );
    } else {
      setClickedChipButtons([...clickedChipButtons, index]);
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, answer: [...prev.p11.answer, index] } }));
      changeData(PAGE_NUMBER, 1, 1, [...cardData.p11.answer, index]);
    }
  };

  const resetButtonOnClick = () => {
    if (isSubmitted) return;

    setClickedChipButtons([]);
    setCardData(prev => ({ ...prev, p11: { ...prev.p11, answer: [] } }));
    changeData(PAGE_NUMBER, 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const check = clickedChipButtons.every((v, i) => cardData.p11.solution[i] === v);
    if (check) {
      setIsCorrect(true);
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isCorrect: true } }));
    }
    answerCardErrorMark(clickedChipButtons);
    setMark(check ? 'correct' : 'incorrect');
  }, [clickedChipButtons]);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      setIsSubmitted(true);
      checkAnswer();
      const isCorrect = cardData.p11.answer.toString() === cardData.p11.solution.toString();
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p11.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  }, [isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (isSubmitted) {
      return false;
    }

    return clickedChipButtons.length !== chipButtonInfo.length;
  }, [isSubmitted, clickedChipButtons]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  useEffect(() => {
    setClickedChipButtons(cardData.p11.answer);
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);


  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={showAnswer ? '답안 닫기' : isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white'>
          <Box padding='25px 145px'>
            <Typography>그녀는 밤늦게 무언가를 먹는 경우가 거의 없다.</Typography>
          </Box>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={isSubmitted}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;