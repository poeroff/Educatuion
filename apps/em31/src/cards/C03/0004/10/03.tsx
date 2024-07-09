import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM02501 from '@maidt-cntn/math/pages/EM-025-01';
import { Box, EStyleFontSizes, ETagLine, IQuestionProps, Input, Label, List, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { useEffect } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { C03000410_store } from './store';

interface Props {
  _page?: string;
  _store?: ICardPageStore | RecoilState<object>;
}

type ICardPageStore = RecoilState<{
  [key: string]: {
    answer1: (number | string)[];
    answer2: (number | string)[];
    answer3: (number | string)[];
    solution1: number[];
    solution2: number[];
    solution3: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
}>;

const P03 = ({ _page = 'P03', _store = C03000410_store }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={3} />수 카드를 한 번씩 모두 이용하여 곱셈식을 만들고, 만든 곱셈식을 나눗셈식 2개로 나타내 보세요.
      </>
    ),
  };

  const pageNumber = _page;
  const pageKey = pageNumber.toLowerCase();
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: false,
        },
      ],
    },
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(_store as ICardPageStore);
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
            answer2: inputData[1]?.value ?? cardPageData.answer2,
            answer3: inputData[2]?.value ?? cardPageData.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const isCorrect = checkCorrect();
    const { answer1, answer2, answer3 } = cardPageData;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: answer1,
            isAnswer: true,
            isCorrect,
          },
          {
            subKey: 2,
            type: 'NUMBER_LIST',
            value: answer2,
            isAnswer: true,
            isCorrect,
          },
          {
            subKey: 3,
            type: 'NUMBER_LIST',
            value: answer3,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, values: (number | string)[]) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: values } }));
    changeData(pageNumber, 1, subKey, values);
  };

  const checkCorrect = () => {
    const { answer1, answer2, answer3, solution1, solution2, solution3 } = cardPageData;
    const isAnswerCorrect1 = checkAnswerCorrect(answer1, solution1);
    const isAnswerCorrect2 = checkAnswerCorrect(answer2, solution2, solution3);
    const isAnswerCorrect3 = checkAnswerCorrect(answer3, solution2, solution3, answer2);

    return isAnswerCorrect1 && isAnswerCorrect2 && isAnswerCorrect3;
  };

  const checkAnswered = (answers: (number | string)[]) => answers.every(answer => String(answer).length > 0 && !isNaN(Number(answer)));

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
    <EM02501
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      questionNode={
        <QuestionNode
          pairAnswers={[[cardPageData.answer1], [cardPageData.answer2, cardPageData.answer3]]}
          pairSolutions={[[cardPageData.solution1], [cardPageData.solution2, cardPageData.solution3]]}
          isSubmitted={cardPageData.isSubmitted}
          onChange={handleChange}
        />
      }
      solutionNode={<SolutionNode />}
      isAnswered={checkAnswered(cardPageData.answer1) && checkAnswered(cardPageData.answer2)}
      isSubmitted={cardPageData.isSubmitted}
      isCorrect={cardPageData.isCorrect}
      onSubmit={handleSubmit}
    />
  );
};

type IPairArray<T> = [[T], [T, T]];

interface IQuestionNode {
  pairAnswers: IPairArray<(number | string)[]>;
  pairSolutions: IPairArray<number[]>;
  isSubmitted: boolean;
  onChange?: (subKey: number, values: (number | string)[]) => void;
}

const QuestionNode = ({ pairAnswers, pairSolutions, isSubmitted, onChange }: IQuestionNode) => {
  const getInputStatus = (answerIndex: number, pairIndex: number, index: number) => {
    const [answer1, answer2] = pairAnswers[answerIndex];
    const [solution1, solution2] = pairSolutions[answerIndex];
    const isPairNotExist = !answer2 || !solution2;

    if (isPairNotExist) {
      const isInputCorrect = answer1[index] === solution1[index];
      return isSubmitted && !isInputCorrect ? 'error' : undefined;
    }

    const targetAnswers = pairIndex === 0 ? answer1 : answer2;
    const targetSolutions = pairIndex === 0 ? solution1 : solution2;
    const otherAnswers = pairIndex === 0 ? answer2 : answer1;
    const otherSolutions = pairIndex === 0 ? solution2 : solution1;

    const isSamePairSolution = solution1[index] === solution2?.[index];
    if (isSamePairSolution) {
      const isInputCorrect = targetAnswers[index] === targetSolutions[index];
      return isSubmitted && !isInputCorrect ? 'error' : undefined;
    }

    const isFirstQuestion = pairIndex === 0;
    const isTargetCorrect = checkAnswerCorrect(targetAnswers, targetSolutions, otherSolutions, isFirstQuestion ? undefined : otherAnswers);
    const isFirstPairCorrect = isFirstQuestion ? isTargetCorrect : checkAnswerCorrect(otherAnswers, otherSolutions);
    const availableSolutions = isFirstQuestion
      ? [targetSolutions[index], otherSolutions[index]]
      : isFirstPairCorrect
      ? [targetSolutions[index]]
      : [targetSolutions[index], otherSolutions[index]];

    const isInputCorrect = availableSolutions.includes(targetAnswers[index] as number);
    const isInputError = !isTargetCorrect || !isInputCorrect;

    return isSubmitted && isInputError ? 'error' : undefined;
  };

  const changeAnswer = (subKey: number, index: number, answers: (number | string)[], value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = isValidString(value) ? Number(value) : '';
    onChange?.(subKey, newAnswers);
  };

  return (
    <>
      <Box padding='16px 0'>
        <List
          gap={24}
          data={[3, 6, 7, 9]}
          align='horizontal'
          row={({ value, index = 1 }) => (
            <Box key={index} width='50px' textAlign='center' backgroundColor='pink'>
              <Typography>{value}</Typography>
            </Box>
          )}
        />
      </Box>

      <Box display='flex' flexDirection='column' marginTop='24px'>
        <Box display='flex'>
          <TextChip text='곱셈식' width={125} marginRight={18} />

          <Box>
            <Typography>7</Typography>
            <Typography>×</Typography>
            <Input
              type='number'
              width='75px'
              ariaLabel='첫 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(0, 0, 0)}
              value={String(pairAnswers[0][0][0] ?? '')}
              onChange={event => changeAnswer(1, 0, pairAnswers[0][0], event.target.value)}
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='75px'
              ariaLabel='두 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(0, 0, 1)}
              value={String(pairAnswers[0][0][1] ?? '')}
              onChange={event => changeAnswer(1, 1, pairAnswers[0][0], event.target.value)}
            />
            <Input
              type='number'
              width='75px'
              ariaLabel='세 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(0, 0, 2)}
              value={String(pairAnswers[0][0][2] ?? '')}
              onChange={event => changeAnswer(1, 2, pairAnswers[0][0], event.target.value)}
            />
          </Box>
        </Box>

        <Box display='flex' flexDirection='column' marginTop='10px'>
          <Box display='flex'>
            <TextChip text='나눗셈식' width={125} />
            <Input
              marginLeft={16}
              type='number'
              width='75px'
              ariaLabel='네 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 0, 0)}
              value={String(pairAnswers[1][0][0] ?? '')}
              onChange={event => changeAnswer(2, 0, pairAnswers[1][0], event.target.value)}
            />
            <Input
              type='number'
              width='75px'
              ariaLabel='다섯 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 0, 1)}
              value={String(pairAnswers[1][0][1] ?? '')}
              onChange={event => changeAnswer(2, 1, pairAnswers[1][0], event.target.value)}
            />
            <Typography>÷</Typography>
            <Input
              type='number'
              width='75px'
              ariaLabel='여섯 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 0, 2)}
              value={String(pairAnswers[1][0][2] ?? '')}
              onChange={event => changeAnswer(2, 2, pairAnswers[1][0], event.target.value)}
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='75px'
              ariaLabel='일곱 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 0, 3)}
              value={String(pairAnswers[1][0][3] ?? '')}
              onChange={event => changeAnswer(2, 3, pairAnswers[1][0], event.target.value)}
            />

            <Box display='flex' alignItems='flex-end'>
              <Typography useGap={false}>,</Typography>
            </Box>
          </Box>

          <Box marginTop={5}>
            <Input
              marginLeft={149}
              type='number'
              width='75px'
              ariaLabel='여덟 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 1, 0)}
              value={String(pairAnswers[1][1][0] ?? '')}
              onChange={event => changeAnswer(3, 0, pairAnswers[1][1], event.target.value)}
            />
            <Input
              type='number'
              width='75px'
              ariaLabel='아홉 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 1, 1)}
              value={String(pairAnswers[1][1][1] ?? '')}
              onChange={event => changeAnswer(3, 1, pairAnswers[1][1], event.target.value)}
            />
            <Typography>÷</Typography>
            <Input
              type='number'
              width='75px'
              ariaLabel='열 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 1, 2)}
              value={String(pairAnswers[1][1][2] ?? '')}
              onChange={event => changeAnswer(3, 2, pairAnswers[1][1], event.target.value)}
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='75px'
              ariaLabel='열한 번째 답 입력란'
              readOnly={isSubmitted}
              maxLength={1}
              status={getInputStatus(1, 1, 3)}
              value={String(pairAnswers[1][1][3] ?? '')}
              onChange={event => changeAnswer(3, 3, pairAnswers[1][1], event.target.value)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const SolutionNode = () => {
  const explains = [
    '수 카드 중에서 두 수를 곱해서 나올 수 있는 곱셈식은 7×9=63입니다.',
    '곱셈식 7×9=63을 나눗셈식 2개로 나타내면 63÷7=9, 63÷9=7입니다.',
  ];

  return (
    <>
      <AnswerTagBox marginTop={0} label='답안'>
        <Box>
          <Typography useGap={false}>9, 6, 3 /</Typography>
        </Box>
        <Box>
          <Typography useGap={false}>6, 3, 7, 9, 6, 3, 9, 7 (또는 6, 3, 9, 7, 6, 3, 7, 9)</Typography>
        </Box>
      </AnswerTagBox>

      <AnswerTagBox marginTop={20} label='풀이'>
        {explains.map((explain, index) => (
          <Typography key={index} useGap={false}>
            {explain}
          </Typography>
        ))}
      </AnswerTagBox>
    </>
  );
};

const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
  <>
    <Box marginTop={marginTop}>
      <Tag type={ETagLine.GREEN} label={label} />
    </Box>

    <Box marginTop='10px'>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

const TextChip = ({ text, width, marginRight = 8 }: { text?: string; width?: number; marginRight?: number }) => (
  <Box
    color='var(--color-yellow-800)'
    backgroundColor='var(--color-yellow-100)'
    border='1px solid var(--color-yellow-700)'
    fontSize={22}
    borderRadius={50}
    display='flex'
    alignItems='center'
    justifyContent='center'
    padding='4px 18px'
    height={44}
    marginRight={marginRight}
    width={width}
  >
    {text}
  </Box>
);

const checkAnswerCorrect = (answers: (number | string)[], solutions: number[], solutions2: number[] = [], pairAnswers?: (number | string)[]) => {
  const isCorrect = answers.every((answer, index) => answer === solutions[index]);
  const isCorrect2 = answers.every((answer, index) => answer === solutions2[index]);
  const isSamePairAnswers = pairAnswers ? answers.every((answer, index) => answer === pairAnswers[index]) : false;

  return !isSamePairAnswers && (isCorrect || isCorrect2);
};

export default P03;
