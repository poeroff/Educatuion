import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Scroll, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { isAnswer, isValidString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';

interface ScrambleQuestionProps {
  cardStore: IScrambleStore;
  pageNumber: string;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
}

export type IScrambleStore = RecoilState<{
  [key: string]: {
    answer1: string[];
    solution1: string[];
    examples: string[];
    options: string[];
    correctAnswer: string;
    explanation: string;
    translations: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
}>;

const ScrambleQuestion = ({ cardStore, pageNumber, headerInfo, questionInfo }: ScrambleQuestionProps) => {
  const pageKey = pageNumber.toLowerCase();
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [],
          isAnswer: false,
        },
      ],
    },
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(cardStore);
  const cardPageData = cardData[pageKey];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputData = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: inputData[0]?.value ?? cardPageData.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = (isCorrect: boolean) => {
    const { answer1 } = cardPageData;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: answer1,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: string[]) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: value } }));
    changeData(pageNumber, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <HE02201_2
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      example={cardPageData.examples[0]}
      options={cardPageData.options}
      answers={cardPageData.answer1}
      solutions={cardPageData.solution1}
      correctAnswer={cardPageData.correctAnswer}
      isCorrect={cardPageData.isCorrect}
      isSubmitted={cardPageData.isSubmitted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export interface IHE02201_2 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  example: string;
  options: string[];
  answers: string[];
  solutions: string[];
  correctAnswer: string;
  isCorrect?: boolean;
  isSubmitted: boolean;
  onChange?: (subKey: number, value: string[]) => void;
  onSubmit?: (isCorrect: boolean) => void;
}

const HE02201_2 = ({
  headerInfo,
  questionInfo,
  example,
  options,
  answers,
  solutions,
  correctAnswer,
  isCorrect,
  isSubmitted,
  onChange,
  onSubmit,
}: IHE02201_2) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const isAnswered = solutions.every((_, index) => isValidString(answers[index]));
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;
  const chunkInfo: IChipButtonInfo[] = options.map((option, index) => {
    const answerIndex = selectedIndexes.findIndex(selectedIndex => selectedIndex === index) ?? -1;
    const solution = solutions[answerIndex];
    const answer = answers[answerIndex];
    const isCorrect = answer === solution;

    return {
      text: option,
      isError: isSubmitted && !isCorrect,
    };
  });

  const getSelectedAnswers = (selected: number[]) => selected.map(value => options[value]);

  const changeAnswer = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(prev => prev.filter(value => value !== index));
      onChange?.(1, getSelectedAnswers(selectedIndexes.filter(value => value !== index)));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
      onChange?.(1, getSelectedAnswers([...selectedIndexes, index]));
    }
  };

  const resetSelected = () => {
    setSelectedIndexes([]);
    onChange?.(1, []);
  };

  const checkCorrect = () => solutions.every((solution, index) => isAnswer(answers[index], solution));

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      const isCorrect = checkCorrect();
      onSubmit?.(isCorrect);
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  useEffect(() => {
    const selectedAnswers = getSelectedAnswers(selectedIndexes);
    const isSame = answers.every((answer, index) => answer === selectedAnswers[index]);

    if (!isSame) {
      const newSelectedIndexes = answers.reduce<number[]>((indexes, answer) => {
        const selectedIndex = options.findIndex((option, index) => option === answer && !indexes.includes(index));
        if (selectedIndex !== -1) {
          indexes.push(selectedIndex);
        }
        return indexes;
      }, []);
      setSelectedIndexes(newSelectedIndexes);
    }
  }, [answers]);

  return (
    <Container
      bodyId='container'
      vAlign={'flex-start'}
      headerInfo={headerInfo}
      questionInfo={{
        mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
        ...questionInfo,
      }}
      submitBtnColor={submitBtnColor}
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box vAlign='center' hAlign='center' height='100%'>
            <Typography lineHeight='42px'>{example}</Typography>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        isCompleted={isSubmitted}
        chipButtonInfo={chunkInfo}
        clickedChipButtons={selectedIndexes}
        chipButtonOnClick={changeAnswer}
        resetButtonOnClick={resetSelected}
      />

      <BottomSheet
        bottomSheetTargetId='container'
        height={'auto'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>

          <Box marginTop='12px'>
            <Typography useGap={false}>{correctAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default ScrambleQuestion;
