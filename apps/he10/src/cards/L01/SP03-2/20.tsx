import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { L01SP03_2 } from '@/cards/L01/SP03-2/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L01SP03_1 } from '../SP03-1/store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

interface P20Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}
interface ITranslation {
  en: string;
  ko: string;
}

const P20 = ({ pageNumber = 'p20', store = 'SP03-2' }: P20Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP03-2' ? L01SP03_2 : L01SP03_1);

  const PAGE_NUM = pageNumber.toUpperCase();

  const [showAnswer, setShowAnswer] = useState(false);

  const chipButtonInfo: IChipButtonInfo[] = useMemo(() => {
    return [
      {
        text: 'it was',
        isError: cardData.p20.isError[0],
      },
      {
        text: 'survived',
        isError: cardData.p20.isError[1],
      },
      {
        text: 'Homo sapiens',
        isError: cardData.p20.isError[2],
      },
      {
        text: 'and thrived',
        isError: cardData.p20.isError[3],
      },
      {
        text: 'who ultimately',
        isError: cardData.p20.isError[4],
      },
    ];
  }, [cardData.p20.isError]);

  const answer = 'it was Homo sapiens who ultimately survived and thrived';
  const solution = [0, 2, 4, 1, 3];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 영작 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '단어카드를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    mark: getMarking(cardData.p20.isSubmitted, cardData.p20.isCorrect),
  };

  const contents: ITranslation[] = [
    {
      en: 'Despite these attributes, however,  ',
      ko: '그러나 이러한 특성에도 불구하고, 궁극적으로 생존하고 번성한 것은 호모 사피엔스였습니다.',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const checkAnswer = useCallback((userAnswer: number[]) => {
    const isError: boolean[] = Array(solution.length).fill(false);

    userAnswer.forEach((item, idx) => {
      if (item !== solution[idx]) {
        isError[item] = true;
      }
    });
    return isError;
  }, []);

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
            isCorrect: userSubmissionList[0].isCorrect || cardData.p20.isCorrect,
            isError: isSubmitted && checkAnswer(userSubmissionList[0].inputData[0]?.value || cardData.p20.clickedChipButtons),
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
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
    changeData(PAGE_NUM, 1, 1, []);
  };

  const handleSubmit = useCallback(() => {
    if (cardData[pageNumber].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      const isError = checkAnswer(cardData.p20.clickedChipButtons);
      const isCorrect = !isError.some(item => item);

      setCardData(prev => ({ ...prev, p20: { ...prev.p20, isSubmitted: true, isCorrect, isError } }));
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
      submitDataWithResult('P20', userSubmission, isCorrect);
    }
  }, [cardData.p20.clickedChipButtons, cardData.p20.isSubmitted]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData[pageNumber].isSubmitted) {
      return false;
    }

    return cardData[pageNumber].clickedChipButtons.length !== chipButtonInfo.length;
  }, [cardData[pageNumber].isSubmitted, cardData[pageNumber].clickedChipButtons]);

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
      submitLabel={showAnswer ? '답안 닫기' : cardData[pageNumber].isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px'>
        <Typography size={EStyleFontSizes.MEDIUM} color={'var(--color-grey-700)'} fontSize='var(--font-size-24)'>
          {contents[0].ko}
        </Typography>
        <Box>
          <Typography size={EStyleFontSizes.MEDIUM}>
            {contents[0].en}
            <Typography type='blank' width='430px' title='빈칸' boxColor='var(--color-black)'></Typography>
            <Typography type='blank' width='300px' title='빈칸' boxColor='var(--color-black)'></Typography>.
          </Typography>
        </Box>
      </Box>
      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData[pageNumber].clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
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