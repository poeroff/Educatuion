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
import { L01SP03_2 } from './store';

interface ITranslation {
  en: string;
  ko: string;
}

const P22 = () => {
  const [mark, setMark] = useState<TMarkType>('none');
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [cardData, setCardData] = useRecoilState(L01SP03_2);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 영작 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    markSize: 'middle',
    mark: mark,
  };

  const contents: ITranslation[] = [
    {
      en: 'The good news is Molly seems to be adapting well, and ',
      ko: '다행인 것은 Molly가 잘 적응하는 것 같고, 나는 그녀가 곧 좋아질 것으로 기대한다.',
    },
  ];
  const [chipButtonInfo, setChipButtonInfo] = useState<IChipButtonInfo[]>([
    {
      text: 'I',
      isError: false,
    },
    {
      text: 'get better soon',
      isError: false,
    },
    {
      text: 'her',
      isError: false,
    },
    {
      text: 'expect',
      isError: false,
    },
    {
      text: 'to',
      isError: false,
    },
  ]);

  const answer = 'I expect her to get better soon';

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
    const pageId = pageIds.find(page => page.page === 'P22')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p22.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p22: {
            ...prev.p22,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));
      }
      initData('P22', userSubmissionList, defaultSubmission, isSubmitted);
      setIsSubmitted(isSubmitted);
      setIsCorrect(defaultIsCorrect);
      setClickedChipButtons(defaultAnswer);
      if (isSubmitted) {
        answerCardErrorMark(defaultAnswer);
        setMark(defaultIsCorrect ? 'correct' : 'incorrect');
      }
    } else {
      if (cardData.p22.isSubmitted) {
        setIsSubmitted(cardData.p22.isSubmitted);
        setIsCorrect(cardData.p22.isCorrect);
        answerCardErrorMark(cardData.p22.answer);
        setMark(cardData.p22.isCorrect ? 'correct' : 'incorrect');
        setClickedChipButtons(cardData.p22.answer);
      }
    }
  };

  const answerCardErrorMark = (answers: number[]) => {
    answers.map((v, i) => {
      if (cardData.p22.solution[i] !== v) {
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
      setCardData(prev => ({ ...prev, p22: { ...prev.p22, answer: prev.p22.answer.filter(value => value !== index) } }));
      changeData(
        'P22',
        1,
        1,
        cardData.p22.answer.filter(value => value !== index),
      );
    } else {
      setClickedChipButtons([...clickedChipButtons, index]);
      setCardData(prev => ({ ...prev, p22: { ...prev.p22, answer: [...prev.p22.answer, index] } }));
      changeData('P22', 1, 1, [...cardData.p22.answer, index]);
    }
  };

  const resetButtonOnClick = () => {
    if (isSubmitted) return;

    setClickedChipButtons([]);
    setCardData(prev => ({ ...prev, p22: { ...prev.p22, answer: [] } }));
    changeData('P22', 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const check = clickedChipButtons.every((v, i) => cardData.p22.solution[i] === v);

    if (check) {
      setIsCorrect(true);
      setCardData(prev => ({ ...prev, p22: { ...prev.p22, isCorrect: true } }));
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
      const isCorrect = cardData.p22.answer.toString() === cardData.p22.solution.toString();
      setCardData(prev => ({ ...prev, p22: { ...prev.p22, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p22.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P22', userSubmission, isCorrect);
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
    setClickedChipButtons(cardData.p22.answer);
    return () => {
      saveData('P22');
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
                <Box width={'100%'}>
                  <Box>
                    <Typography tabIndex={Number(`1${index}2`)} size={EStyleFontSizes.MEDIUM} color={'var(--color-blue-900)'}>
                      {value?.ko}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography tabIndex={Number(`1${index}3`)} size={EStyleFontSizes.MEDIUM}>
                      {value?.en}
                      <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)'></Typography>.
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

export default P22;
