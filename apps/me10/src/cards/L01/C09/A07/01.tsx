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

const P01 = () => {
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
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const chipButtonInfo: IChipButtonInfo[] = [
    {
      text: 'don’t',
      backgroundColor: 'var(--color-yellow-200)',
    },
    {
      text: 'I',
      backgroundColor: 'var(--color-green-200)',
    },
    {
      text: 'eat lemon.',
      backgroundColor: 'var(--color-red-200)',
    },
    {
      text: 'He',
      backgroundColor: 'var(--color-blue-200)',
    },
    {
      text: 'have a mirror.',
      backgroundColor: 'var(--color-pink-300)',
    },
    {
      text: 'doesn’t',
      backgroundColor: 'var(--color-purple-200)',
    },
  ];
  const answer = [
    'I eat lemon.',
    'I don’t eat lemon.',
    'He doesn’t eat lemon.',
    'I have a mirror.',
    'I don’t have a mirror.',
    'He doesn’t have a mirror.',
  ];

  const isCorrect = useMemo(() => {
    const clickedText = cardData.p01.clickedChipButtons.map((index: number) => chipButtonInfo[index].text).join(' ');
    return answer.some(statement => statement === clickedText);
  }, [cardData.p01.clickedChipButtons]);

  useEffect(() => {
    if (cardData.p01.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p01.isSubmitted, isCorrect]);

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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p01.clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const chipButtonOnClick = (index: number) => {
    if (cardData.p01.isSubmitted) return;

    let newButtons: number[] = cardData.p01.clickedChipButtons;
    if (cardData.p01.clickedChipButtons.includes(index)) {
      newButtons = newButtons.filter(value => value !== index);
    } else {
      newButtons = [...newButtons, index];
    }

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        clickedChipButtons: newButtons,
      },
    }));
    changeData('P01', 1, 1, newButtons);
  };

  const resetButtonOnClick = () => {
    if (cardData.p01.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        clickedChipButtons: [],
      },
    }));
  };

  const handleSubmit = useCallback(() => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  }, [cardData.p01.isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p01.isSubmitted) {
      return false;
    }

    return cardData.p01.clickedChipButtons.length < 2;
  }, [cardData.p01.isSubmitted, cardData.p01.clickedChipButtons]);

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
      submitLabel={showAnswer ? '답안 닫기' : cardData.p01.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        chipButtonMinWidth='240px'
        clickedChipButtons={cardData.p01.clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
      />
      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              <List data={answer} row={({ value }) => <Typography>{value}</Typography>} />
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
