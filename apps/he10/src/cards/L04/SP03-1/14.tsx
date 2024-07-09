import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, TMainHeaderInfoTypes, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP031State from './store';

const P14 = ({ _page = 'P14' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP031State);

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
      text: 'just a drink',
      answer: 2,
      isError: false,
    },
    {
      text: 'Coffee is',
      answer: 0,
      isError: false,
    },
    {
      text: 'not',
      answer: 1,
      isError: false,
    },
    {
      text: 'but',
      answer: 3,
      isError: false,
    },
    {
      text: 'a daily necessity',
      answer: 4,
      isError: false,
    },
  ]);

  const answer = 'Coffee is not just a drink but a daily necessity';

  const isCorrect = useMemo(() => {
    return cardData.p14.clickedChipButtons.map(index => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData.p14.clickedChipButtons]);

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = [...chipButtonInfo];
    const results = cardData.p14.clickedChipButtons.map((index, idx) => {
      if (chipButtonInfo[index].answer === idx) {
        return true;
      } else {
        newChipButtonInfo[index].isError = true;
        return false;
      }
    });
    setMark(results.every(item => item) ? 'correct' : 'incorrect');
    setChipButtonInfo(newChipButtonInfo);
  }, [cardData.p14.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p14.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
      checkAnswer();
    }
  }, [cardData.p14.isSubmitted, isCorrect]);

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
          p14: {
            ...prev.p14,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p14.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p14: { ...prev.p14, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p14.clickedChipButtons,
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
    if (cardData.p14.isSubmitted) return;

    const newButtons = cardData.p14.clickedChipButtons.includes(index)
      ? cardData.p14.clickedChipButtons.filter(value => value !== index)
      : [...cardData.p14.clickedChipButtons, index];

    setCardData(prev => ({
      ...prev,
      p14: {
        ...prev.p14,
        clickedChipButtons: newButtons,
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p14.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p14: {
        ...prev.p14,
        clickedChipButtons: [],
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, []);
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p14.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
      checkAnswer();
    }
  }, [cardData.p14.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p14.isSubmitted) {
      return false;
    }

    return cardData.p14.clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData.p14.isSubmitted, cardData.p14.clickedChipButtons]);

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
      submitLabel={showAnswer ? '답안 닫기' : cardData.p14.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px' textAlign='center'>
        <Typography>커피는 단순한 음료가 아닌 생활필수품이다.</Typography>
      </Box>
      <Box marginBottom='24px' padding='10px' textAlign='center'>
        <Typography>
          <Typography type='blank' width='500px' title='빈칸' boxColor='var(--color-black)'></Typography>.
        </Typography>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p14.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={cardData.p14.isSubmitted}
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

export default P14;