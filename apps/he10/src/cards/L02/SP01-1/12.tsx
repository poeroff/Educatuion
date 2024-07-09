import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP01_1 } from './store';

interface pageType {
  _page?: string;
}

const P12 = ({ _page = 'P12' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_1);

  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P12.mp3',
  };

  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: "isn't",
      answer: 0,
      isError: false,
    },
    {
      text: 'considered',
      answer: 3,
      isError: false,
    },
    {
      text: 'a bit rude',
      answer: 4,
      isError: false,
    },
    {
      text: 'tongues',
      answer: 2,
      isError: false,
    },
    {
      text: 'sticking out',
      answer: 1,
      isError: false,
    },
  ]);

  const answer = "isn't sticking out tongues considered a bit rude";

  const isCorrect = useMemo(() => {
    return cardData.p12.clickedChipButtons.map(index => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData.p12.clickedChipButtons]);

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = [...chipButtonInfo];
    const results = cardData.p12.clickedChipButtons.map((index, idx) => {
      if (chipButtonInfo[index].answer === idx) {
        return true;
      } else {
        newChipButtonInfo[index].isError = true;
        return false;
      }
    });
    setMark(results.every(item => item) ? 'correct' : 'incorrect');
    setChipButtonInfo(newChipButtonInfo);
  }, [cardData.p12.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p12.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
      checkAnswer();
    }
  }, [cardData.p12.isSubmitted, isCorrect]);

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
          p12: {
            ...prev.p12,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p12.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p12.clickedChipButtons,
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
    if (cardData.p12.isSubmitted) return;

    const newButtons = cardData.p12.clickedChipButtons.includes(index)
      ? cardData.p12.clickedChipButtons.filter(value => value !== index)
      : [...cardData.p12.clickedChipButtons, index];

    setCardData(prev => ({
      ...prev,
      p12: {
        ...prev.p12,
        clickedChipButtons: newButtons,
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p12.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p12: {
        ...prev.p12,
        clickedChipButtons: [],
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, []);
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p12.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
      checkAnswer();
    }
  }, [cardData.p12.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p12.isSubmitted) {
      return false;
    }

    return cardData.p12.clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData.p12.isSubmitted, cardData.p12.clickedChipButtons]);

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
      submitLabel={showAnswer ? '답안 닫기' : cardData.p12.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Box marginTop='6px'>
              <Label value='B' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Typography>Well, it's said that there was a cold-blooded king named</Typography>
              <Typography>Lang Darma, who had a black tongue. To prove they weren't</Typography>
              <Typography>related to him, Tibetans started showing their tongues when</Typography>
              <Typography>they met someone new.</Typography>
            </Box>
          </Box>
          <Box>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
            <Typography>
              Oh, interesting. But &nbsp;
              <Typography type='blank' width='400px' title='빈칸' boxColor='var(--color-black)'></Typography>
            </Typography>
            <Typography>in some cultures, like ours?</Typography>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p12.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={cardData.p12.isSubmitted}
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

export default P12;
