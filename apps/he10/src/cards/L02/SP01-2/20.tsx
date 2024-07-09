import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02SP01_2 } from './store';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P20 = () => {
  const PAGE_NUMBER = 'P20';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);

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
    audioSrc: '/L02/SP01-2/HE1-L02-SP01-2-P20.mp3',
  };

  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'with',
      answer: 3,
      isError: false,
    },
    {
      text: 'It’s great',
      answer: 0,
      isError: false,
    },
    {
      text: 'to have',
      answer: 1,
      isError: false,
    },
    {
      text: 'a friend',
      answer: 2,
      isError: false,
    },
    {
      text: 'similar interests',
      answer: 4,
      isError: false,
    },
  ]);

  const answer = 'It’s great to have a friend with similar interests';

  const isCorrect = useMemo(() => {
    return cardData.p20.clickedChipButtons.map(index => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData.p20.clickedChipButtons]);

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = [...chipButtonInfo];
    const results = cardData.p20.clickedChipButtons.map((index, idx) => {
      if (chipButtonInfo[index].answer === idx) {
        return true;
      } else {
        newChipButtonInfo[index].isError = true;
        return false;
      }
    });
    setMark(results.every(item => item) ? 'correct' : 'incorrect');
    setChipButtonInfo(newChipButtonInfo);
  }, [cardData.p20.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p20.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
      checkAnswer();
    }
  }, [cardData.p20.isSubmitted, isCorrect]);

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
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p20: {
            ...prev.p20,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p20.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p20: { ...prev.p20, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p20.clickedChipButtons,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
  };

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

  const chipButtonOnClick = (index: number) => {
    if (cardData.p20.isSubmitted) return;

    const newButtons = cardData.p20.clickedChipButtons.includes(index)
      ? cardData.p20.clickedChipButtons.filter(value => value !== index)
      : [...cardData.p20.clickedChipButtons, index];

    setCardData(prev => ({
      ...prev,
      p20: {
        ...prev.p20,
        clickedChipButtons: newButtons,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p20.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p20: {
        ...prev.p20,
        clickedChipButtons: [],
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, []);
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p20.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
      checkAnswer();
    }
  }, [cardData.p20.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p20.isSubmitted) {
      return false;
    }

    return cardData.p20.clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData.p20.isSubmitted, cardData.p20.clickedChipButtons]);

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
      submitLabel={showAnswer ? '답안 닫기' : cardData.p20.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Box marginTop='6px'>
              <Label value='G' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography lineHeight='42px'>Well, I have a few books at home that I’ve enjoyed. I’ll bring them in tomorrow if you want.</Typography>
          </Box>
          <Box display='flex' marginTop='10px'>
            <Box marginTop='6px'>
              <Label value='B' type='paint' background='var(--color-yellow-100)' marginRight={8} />
            </Box>
            <Typography lineHeight='42px'>That would be really kind of you. Thanks.</Typography>
          </Box>
          <Box display='flex' marginTop='10px'>
            <Box marginTop='6px'>
              <Label value='G' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography lineHeight='42px'>
              You’re welcome. &nbsp;
              <Typography type='blank' width='640px' title='빈칸' boxColor='var(--color-black)'></Typography>.
            </Typography>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p20.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={cardData.p20.isSubmitted}
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

export default P20;
