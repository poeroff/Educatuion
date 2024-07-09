import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, TMainHeaderInfoTypes, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP032State from './store';

const P23 = ({ _page = 'P23' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP032State);

  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 영작 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    markSize: 'middle',
    mark: mark,
  };

  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'they',
      answer: 1,
      isError: false,
    },
    {
      text: 'organic fertilizer',
      answer: 4,
      isError: false,
    },
    {
      text: 'are',
      answer: 2,
      isError: false,
    },
    {
      text: 'transformed into',
      answer: 3,
      isError: false,
    },
    {
      text: 'where',
      answer: 0,
      isError: false,
    },
  ]);

  const answer = 'where they are transformed into organic fertilizer';

  const isCorrect = useMemo(() => {
    return cardData.p23.clickedChipButtons.map(index => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData.p23.clickedChipButtons]);

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = [...chipButtonInfo];
    const results = cardData.p23.clickedChipButtons.map((index, idx) => {
      if (chipButtonInfo[index].answer === idx) {
        return true;
      } else {
        newChipButtonInfo[index].isError = true;
        return false;
      }
    });
    setMark(results.every(item => item) ? 'correct' : 'incorrect');
    setChipButtonInfo(newChipButtonInfo);
  }, [cardData.p23.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p23.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
      checkAnswer();
    }
  }, [cardData.p23.isSubmitted, isCorrect]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
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
          p23: {
            ...prev.p23,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p23.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p23: { ...prev.p23, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p23.clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
  };

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

  const chipButtonOnClick = (index: number) => {
    if (cardData.p23.isSubmitted) return;

    const newButtons = cardData.p23.clickedChipButtons.includes(index)
      ? cardData.p23.clickedChipButtons.filter(value => value !== index)
      : [...cardData.p23.clickedChipButtons, index];

    setCardData(prev => ({
      ...prev,
      p23: {
        ...prev.p23,
        clickedChipButtons: newButtons,
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p23.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p23: {
        ...prev.p23,
        clickedChipButtons: [],
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, []);
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p23.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
      checkAnswer();
    }
  }, [cardData.p23.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p23.isSubmitted) {
      return false;
    }

    return cardData.p23.clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData.p23.isSubmitted, cardData.p23.clickedChipButtons]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={showAnswer ? '답안 닫기' : cardData.p23.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px' textAlign='center'>
        <Typography>생성된 SCG는 비료회사에 판매되는데 그곳에서 유기비료로 전환된다.</Typography>
      </Box>
      <Box marginBottom='24px' padding='10px' textAlign='center'>
        <Typography>
          The resulting SCGs are sold to fertilizer companies,{' '}
          <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>.
        </Typography>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p23.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={cardData.p23.isSubmitted}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P23;
