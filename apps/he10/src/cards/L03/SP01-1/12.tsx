import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
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
import { L03SP011State } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P12 = ({ _page = 'p12' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

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
    audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P12.mp3',
  };

  const chipButtonInfo: IChipButtonInfo[] = useMemo(() => {
    return [
      {
        text: 'melted',
      },
      {
        text: 'slower than',
      },
      {
        text: 'much',
      },
      {
        text: 'the ice',
      },
      {
        text: 'in my drink',
      },
    ];
  }, []);

  const answer = 'the ice in my drink melted much slower than';
  const answerIdx = useMemo(() => {
    return [3, 4, 0, 2, 1];
  }, []);

  const setDropboxColor = useCallback(
    (clickedChipButtons: number[]) => {
      clickedChipButtons.map((index, idx) => {
        if (answerIdx[idx] === index) {
          return true;
        } else {
          chipButtonInfo[index].isError = true;
          return false;
        }
      });
    },
    [answerIdx, chipButtonInfo],
  );
  const isCorrect = useMemo(() => {
    return cardData.p12.clickedChipButtons.map((index: number) => chipButtonInfo[index].text).join(' ') === answer;
  }, [cardData.p12.clickedChipButtons, chipButtonInfo]);

  useEffect(() => {
    if (cardData.p12.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
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
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const tempClickedChipButtons: number[] = userSubmissionList[0].inputData[0]?.value || cardData.p12.clickedChipButtons;
        isSubmitted && setDropboxColor(tempClickedChipButtons);
        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p12.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = useCallback(() => {
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
    setDropboxColor(cardData.p12.clickedChipButtons);
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  }, [PAGE_NUM, cardData.p12.clickedChipButtons, isCorrect, setCardData, setDropboxColor, submitDataWithResult]);

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
    if (cardData.p12.isSubmitted) return;

    let newButtons: number[] = cardData.p12.clickedChipButtons;
    if (cardData.p12.clickedChipButtons.includes(index)) {
      newButtons = newButtons.filter(value => value !== index);
    } else {
      newButtons = [...newButtons, index];
    }

    setCardData(prev => ({
      ...prev,
      p12: {
        ...prev.p12,
        clickedChipButtons: newButtons,
      },
    }));
    changeData(PAGE_NUM, 1, 1, newButtons);
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
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p12.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  }, [cardData.p12.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p12.isSubmitted) {
      return false;
    }

    return cardData.p12.clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData.p12.isSubmitted, cardData.p12.clickedChipButtons.length, chipButtonInfo.length]);

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
      submitLabel={showAnswer ? '답안닫기' : cardData.p12.isSubmitted ? '답안보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll>
          <Box display='flex'>
            <Label value='B' type='paint' background='var(--color-blue-100)' />
            <Typography>
              Come to think of it, &nbsp;
              <Typography type='blank' width='240px' title='빈칸' boxColor='var(--color-black)'></Typography>
              &nbsp; regular ice cubes.
            </Typography>
          </Box>
          <Box display='flex'>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
            <Typography>That’s because a sphere has the least surface area for a given volume.</Typography>
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
            <Typography>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
