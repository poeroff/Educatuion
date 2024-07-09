import { L03SP03_1 } from '@/cards/L03/SP03-1/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

interface ITranslation {
  en: string;
  ko: string;
}

const P15 = ({ _page = 'P15' }) => {
  const [mark, setMark] = useState<TMarkType>('none');
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);
  const [cardData, setCardData] = useRecoilState(L03SP03_1);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 영작 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다. ',
    markSize: 'middle',
    mark: mark,
  };

  const contents: ITranslation[] = [
    {
      en: ' if you throw two stones, sound waves can also interfere with  each other when they meet. ',
      ko: '두 개의 돌을 던지면 물에서 서로 다른 잔물결이 겹칠 수 있는 것처럼, 소리 파동도 만나면 서로 간섭할 수 있다.',
    },
  ];

  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'Just as',
      isError: false,
    },
    {
      text: 'ripples in water',
      isError: false,
    },
    {
      text: 'overlap',
      isError: false,
    },
    {
      text: 'might',
      isError: false,
    },
    {
      text: 'different',
      isError: false,
    },
  ]);

  const answer = 'Just as different ripples in water might overlap';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: true,
          isCorrect,
        },
      ],
      isCorrect,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    setIsSubmitted(cardData.p15.isSubmitted);
    setIsCorrect(cardData.p15.isCorrect);
    if (cardData.p15.isSubmitted) {
      setMark(cardData.p15.isCorrect ? 'correct' : 'incorrect');
    }

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p15.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p15: {
            ...prev.p15,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
      setIsSubmitted(isSubmitted);
      setIsCorrect(defaultIsCorrect);
      if (isSubmitted) {
        setMark(defaultIsCorrect ? 'correct' : 'incorrect');
        setClickedChipButtons(defaultAnswer);
        answerCardErrorMark(defaultAnswer);
      }
    } else {
      if (cardData.p15.isSubmitted) {
        setIsSubmitted(cardData.p15.isSubmitted);
        setIsCorrect(cardData.p15.isCorrect);
        answerCardErrorMark(cardData.p15.answer);
        setMark(cardData.p15.isCorrect ? 'correct' : 'incorrect');
      }
    }
  };

  const answerCardErrorMark = (answers: number[]) => {
    answers.map((v, i) => {
      if (cardData.p15.solution[i] !== v) {
        setChipButtonInfo(prev =>
          prev.map((info, index) => {
            if (index === v) {
              info.isError = true;
            }
            return info;
          }),
        );
      } else {
        setChipButtonInfo(prev =>
          prev.map((info, index) => {
            if (index === v) {
              info.isError = false;
            }
            return info;
          }),
        );
      }
    });
  };

  const chipButtonOnClick = (index: number) => {
    if (isSubmitted) return;

    if (clickedChipButtons.includes(index)) {
      setClickedChipButtons(prev => prev.filter(value => value !== index));
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, answer: prev.p15.answer.filter(value => value !== index) } }));
      changeData(
        _page,
        1,
        1,
        cardData.p15.answer.filter(value => value !== index),
      );
    } else {
      setClickedChipButtons([...clickedChipButtons, index]);
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, answer: [...prev.p15.answer, index] } }));
      changeData(_page, 1, 1, [...cardData.p15.answer, index]);
    }
  };

  const resetButtonOnClick = () => {
    if (isSubmitted) return;

    setClickedChipButtons([]);
    setCardData(prev => ({ ...prev, p15: { ...prev.p15, answer: [] } }));
    changeData(_page, 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const check = clickedChipButtons.every((v, i) => cardData.p15.solution[i] === v);
    if (check) {
      setIsCorrect(true);
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, isCorrect: true } }));
    }
    answerCardErrorMark(clickedChipButtons);
    setMark(check ? 'correct' : 'incorrect');
  }, [clickedChipButtons]);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      setIsSubmitted(true);
      checkAnswer();
      const isCorrect = cardData.p15.answer.toString() === cardData.p15.solution.toString();
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p15.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  }, [isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (isSubmitted) {
      return false;
    }

    return clickedChipButtons.length !== chipButtonInfo.length;
  }, [isSubmitted, clickedChipButtons]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  useEffect(() => {
    setClickedChipButtons(cardData.p15.answer);
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={showAnswer ? '답안 닫기' : isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px'>
        <List<ITranslation>
          data={contents}
          row={({ value, index = 1 }) => (
            <BoxWrap>
              <Box>
                <Typography size={EStyleFontSizes.MEDIUM} color={'var(--color-blue-900)'}>
                  {value?.ko}
                </Typography>
                <Box>
                  <Typography size={EStyleFontSizes.MEDIUM}>
                    <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)' />
                    {value?.en}
                  </Typography>
                </Box>
              </Box>
            </BoxWrap>
          )}
        />
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={isSubmitted}
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

export default P15;