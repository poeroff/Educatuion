import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
  Label,
} from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import L01SP011State from '@/cards/L01/SP01-2/store';
import L01SP012State from './store';

interface P19Props {
  pageNumber?: string;
  store?: 'SP01-1' | 'SP01-2';
}

const P19: React.FC<P19Props> = ({ pageNumber = 'p19', store = 'SP01-2' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP01-2' ? L01SP012State : L01SP011State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 단어카드를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-2/HE1-L01-SP01-2-P19.mp3',
  };

  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'I',
      answer: 0,
      isError: false,
    },
    {
      text: 'so well',
      answer: 4,
      isError: false,
    },
    {
      text: 'could',
      answer: 1,
      isError: false,
    },
    {
      text: 'never',
      answer: 2,
      isError: false,
    },
    {
      text: 'have done',
      answer: 3,
      isError: false,
    },
  ]);

  const answer = 'I could never have done so well';

  const isCorrect = useMemo(() => {
    return cardData[pageNumber].clickedChipButtons.map((index: number) => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData[pageNumber].clickedChipButtons, chipButtonInfo]);

  useEffect(() => {
    if (cardData[pageNumber].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageNumber].isSubmitted, isCorrect]);

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
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].clickedChipButtons,
            isSubmitted,
          },
        }));

        if (isSubmitted) {
          const newChipButtonInfo = chipButtonInfo.map((chip, idx) => ({
            ...chip,
            isError: idx !== userSubmissionList[0].inputData[0]?.value[chip.answer as number],
          }));
          setChipButtonInfo(newChipButtonInfo);
        }
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const newChipButtonInfo = chipButtonInfo.map((chip, idx) => ({
      ...chip,
      isError: idx !== cardData[pageNumber].clickedChipButtons[chip.answer as number],
    }));
    setChipButtonInfo(newChipButtonInfo);

    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData[pageNumber].clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const chipButtonOnClick = (index: number) => {
    if (cardData[pageNumber].isSubmitted) return;

    let newButtons: number[] = cardData[pageNumber].clickedChipButtons;
    if (cardData[pageNumber].clickedChipButtons.includes(index)) {
      newButtons = newButtons.filter(value => value !== index);
    } else {
      newButtons = [...newButtons, index];
    }

    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        clickedChipButtons: newButtons,
      },
    }));
    changeData(PAGE_NUM, 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData[pageNumber].isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        clickedChipButtons: [],
      },
    }));

    setChipButtonInfo(chipButtonInfo.map(chip => ({ ...chip, isError: false })));
  };

  const handleSubmit = useCallback(() => {
    if (cardData[pageNumber].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  }, [cardData[pageNumber].isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData[pageNumber].isSubmitted) {
      return false;
    }

    return cardData[pageNumber].clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData[pageNumber].isSubmitted, cardData[pageNumber].clickedChipButtons, chipButtonInfo.length]);

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
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={showAnswer ? '답안 닫기' : cardData[pageNumber].isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='20px' useRound height='137px' background='white' padding='10px'>
        <Box display='flex' vAlign='center'>
          <Label value='A' type='paint' background='var(--color-blue-100)' />
          <Typography>Now I understand why the performance was perfect.</Typography>
        </Box>
        <Box display='flex' vAlign='center' marginTop={10}>
          <Label value='B' type='paint' background='var(--color-yellow-100)' />
          <Typography>
            Without my other team members, <Typography type='blank' width='300px' title='빈칸' boxColor='var(--color-black)'></Typography> .
          </Typography>
        </Box>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData[pageNumber].clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={cardData.p19.isSubmitted}
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

export default P19;
