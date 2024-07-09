import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM03501 from '@maidt-cntn/math/pages/EM-035-01';
import { Box, EStyleFontSizes, ETagLine, IQuestionProps, Image, Label, List, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
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
    solution1: number[];
    solution1_2: number[];
    solution2: number[];
    solution2_2: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
}>;

const P01 = ({ _page = 'P01', _store = C03000410_store }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    size: 'large',
    text: (
      <>
        <Label type='icon' value={1} />
        관계있는 것끼리 이어 보세요.
      </>
    ),
  };
  const info = {
    direction: 'vertical' as const,
    lines: {
      left: ['35÷7=5', '42÷6=7', '25÷5=5'],
      right: ['6×7=42', '5×7=35', '5×5=25'],
    },
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
    const { answer1 } = cardPageData;
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
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, index: number, value: (number | string)[]) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: value } }));
    changeData(pageNumber, 1, subKey, value);
  };

  const checkCorrect = () => cardPageData.answer1.every((answer, answerIndex) => Number(answer) === cardPageData.solution1[answerIndex]);

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
    <EM03501
      info={info}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      solutionNode={<SolutionNode />}
      answers={cardPageData.answer1}
      solutions={cardPageData.solution1}
      isAnswered={cardPageData.answer1.every(answer => String(answer).length > 0 && !isNaN(Number(answer)))}
      isSubmitted={cardPageData.isSubmitted}
      isCorrect={cardPageData.isCorrect}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

const SolutionNode = () => {
  const explains = [
    '35÷7=5를 곱셈식으로 나타내면 5×7=35입니다.',
    '42÷6=7을 곱셈식으로 나타내면 6×7=42입니다.',
    '25÷5=5를 곱셈식으로 나타내면 5×5=25입니다.',
  ];

  return (
    <>
      <AnswerTagBox marginTop={0} label='답안'>
        <Image src='/C03/0004/10/C-EM31-03-0004-1001.png' alt='답안 이미지 입니다.' />
      </AnswerTagBox>

      <AnswerTagBox marginTop={20} label='풀이'>
        <List
          gap={10}
          data={explains}
          align='vertical'
          row={({ value, index = 1 }) => (
            <Typography key={index} useGap={false}>
              {value}
            </Typography>
          )}
        />
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

export default P01;
