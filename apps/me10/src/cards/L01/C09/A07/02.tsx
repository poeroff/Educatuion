import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  List,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L01C09A07 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardData, setCardData] = useRecoilState(L01C09A07);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meFunActivity',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '카드를 조합하여 문장을 완성해 봅시다.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const chipButtonInfo: IChipButtonInfo[] = [
    {
      text: 'get up',
      backgroundColor: 'var(--color-yellow-200)',
    },
    {
      text: 'don’t',
      backgroundColor: 'var(--color-blue-200)',
    },
    {
      text: 'They',
      backgroundColor: 'var(--color-red-200)',
    },
    {
      text: 'My sister',
      backgroundColor: 'var(--color-pink-200)',
    },
    {
      text: 'at eight.',
      backgroundColor: 'var(--color-green-300)',
    },
    {
      text: 'teaches',
      backgroundColor: 'var(--color-pink-300)',
    },
    {
      text: 'English.',
      backgroundColor: 'var(--color-green-200)',
    },
    {
      text: 'doesn’t',
      backgroundColor: 'var(--color-purple-200)',
    },
  ];
  const answer = ['They get up at eight.', 'They don’t get up at eight.', 'My sister doesn’t get up at eight.', 'My sister teaches English.'];

  const isCorrect = useMemo(() => {
    const clickedText = cardData.p02.clickedChipButtons.map((index: number) => chipButtonInfo[index].text).join(' ');
    return answer.some(statement => statement === clickedText);
  }, [cardData.p02.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p02.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p02.isSubmitted, isCorrect]);

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
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p02.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p02.clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const chipButtonOnClick = (index: number) => {
    if (cardData.p02.isSubmitted) return;

    let newButtons: number[] = cardData.p02.clickedChipButtons;
    if (cardData.p02.clickedChipButtons.includes(index)) {
      newButtons = newButtons.filter(value => value !== index);
    } else {
      newButtons = [...newButtons, index];
    }

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        clickedChipButtons: newButtons,
      },
    }));
    changeData('P02', 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p02.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        clickedChipButtons: [],
      },
    }));
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  }, [cardData.p02.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p02.isSubmitted) {
      return false;
    }

    return cardData.p02.clickedChipButtons.length < 2;
  }, [cardData.p02.isSubmitted, cardData.p02.clickedChipButtons]);

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
      vAlign='center'
      submitLabel={showAnswer ? '답안 닫기' : cardData.p02.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        chipButtonMinWidth='182px'
        clickedChipButtons={cardData.p02.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
      />
      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <List data={answer} row={({ value }) => <Typography>{value}</Typography>} />
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
