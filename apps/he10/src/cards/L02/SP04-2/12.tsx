import { L02SP042 } from './store';
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

const P12 = () => {
  const [mark, setMark] = useState<TMarkType>('none');
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [cardData, setCardData] = useRecoilState(L02SP042);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 영작 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    markSize: 'middle',
    mark: mark,
  };

  const contents: ITranslation[] = [
    {
      en: 'He was surprised ',
      ko: '그는 그 노래가 얼마나 오래됐는지 듣고 놀랐다.',
    },
  ];
  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'how',
      isError: false,
    },
    {
      text: 'the song',
      isError: false,
    },
    {
      text: 'to hear',
      isError: false,
    },
    {
      text: 'was',
      isError: false,
    },
    {
      text: 'old',
      isError: false,
    },
  ]);

  const answer = 'to hear how old the song was';

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
    const pageId = pageIds.find(page => page.page === 'P12')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p12.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));
      }
      initData('P12', userSubmissionList, defaultSubmission, isSubmitted);
      setIsSubmitted(isSubmitted);
      setIsCorrect(defaultIsCorrect);
      setClickedChipButtons(defaultAnswer);
      if (isSubmitted) {
        answerCardErrorMark(defaultAnswer);

        setMark(defaultIsCorrect ? 'correct' : 'incorrect');
      }
    } else {
      if (cardData.p12.isSubmitted) {
        setIsSubmitted(cardData.p12.isSubmitted);
        setIsCorrect(cardData.p12.isCorrect);
        answerCardErrorMark(cardData.p12.answer);
        setMark(cardData.p12.isCorrect ? 'correct' : 'incorrect');
      }
    }
  };

  const answerCardErrorMark = (answers: number[]) => {
    answers.map((v, i) => {
      if (cardData.p12.solution[i] !== v) {
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
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, answer: prev.p12.answer.filter(value => value !== index) } }));
      changeData(
        'P12',
        1,
        1,
        cardData.p12.answer.filter(value => value !== index),
      );
    } else {
      setClickedChipButtons([...clickedChipButtons, index]);
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, answer: [...prev.p12.answer, index] } }));
      changeData('P12', 1, 1, [...cardData.p12.answer, index]);
    }
  };

  const resetButtonOnClick = () => {
    if (isSubmitted) return;

    setClickedChipButtons([]);
    setCardData(prev => ({ ...prev, p12: { ...prev.p12, answer: [] } }));
    changeData('P12', 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const check = clickedChipButtons.every((v, i) => cardData.p12.solution[i] === v);

    if (check) {
      setIsCorrect(true);
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isCorrect: true } }));
    }
    answerCardErrorMark(clickedChipButtons);

    setMark(check ? 'correct' : 'incorrect');
  }, [clickedChipButtons]);

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      setIsSubmitted(true);
      checkAnswer();
      const isCorrect = cardData.p12.answer.toString() === cardData.p12.solution.toString();
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p12.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P12', userSubmission, isCorrect);
    }
  };

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
    setClickedChipButtons(cardData.p12.answer);
    return () => {
      saveData('P12');
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
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
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
                      {value?.en}
                      <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)'></Typography>.
                    </Typography>
                  </Box>
                </Box>
              </BoxWrap>
            )}
          />
        </Scroll>
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

export default P12;
