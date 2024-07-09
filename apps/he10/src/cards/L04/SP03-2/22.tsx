import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, TMainHeaderInfoTypes, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP032State from './store';

const P22 = ({ _page = 'P22' }: { _page?: string }) => {
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
      text: 'for',
      answer: 2,
      isError: false,
    },
    {
      text: 'as long',
      answer: 3,
      isError: false,
    },
    {
      text: 'as possible',
      answer: 4,
      isError: false,
    },
    {
      text: 'the reuse of',
      answer: 0,
      isError: false,
    },
    {
      text: 'resources',
      answer: 1,
      isError: false,
    },
  ]);

  const answer = 'the reuse of resources for as long as possible';

  const isCorrect = useMemo(() => {
    return cardData.p22.clickedChipButtons.map(index => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData.p22.clickedChipButtons]);

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = [...chipButtonInfo];
    const results = cardData.p22.clickedChipButtons.map((index, idx) => {
      if (chipButtonInfo[index].answer === idx) {
        return true;
      } else {
        newChipButtonInfo[index].isError = true;
        return false;
      }
    });
    setMark(results.every(item => item) ? 'correct' : 'incorrect');
    setChipButtonInfo(newChipButtonInfo);
  }, [cardData.p22.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p22.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
      checkAnswer();
    }
  }, [cardData.p22.isSubmitted, isCorrect]);

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
          p22: {
            ...prev.p22,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p22.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p22: { ...prev.p22, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p22.clickedChipButtons,
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
    if (cardData.p22.isSubmitted) return;

    const newButtons = cardData.p22.clickedChipButtons.includes(index)
      ? cardData.p22.clickedChipButtons.filter(value => value !== index)
      : [...cardData.p22.clickedChipButtons, index];

    setCardData(prev => ({
      ...prev,
      p22: {
        ...prev.p22,
        clickedChipButtons: newButtons,
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p22.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p22: {
        ...prev.p22,
        clickedChipButtons: [],
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, []);
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p22.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
      checkAnswer();
    }
  }, [cardData.p22.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p22.isSubmitted) {
      return false;
    }

    return cardData.p22.clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData.p22.isSubmitted, cardData.p22.clickedChipButtons]);

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
      submitLabel={showAnswer ? '답안 닫기' : cardData.p22.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px'>
        <Typography>순환 경제는 가능한 한 오랫동안 자원을 재사용하도록 촉진하여 폐기물과 환경 비용을 줄인다.</Typography>
      </Box>
      <Box marginBottom='24px' padding='10px' textAlign='center'>
        <Typography align='center'>
          A circular economy promotes <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>, reducing waste
          and environmental costs.
        </Typography>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p22.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={cardData.p22.isSubmitted}
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

export default P22;
