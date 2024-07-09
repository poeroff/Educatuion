import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM03501 from '@maidt-cntn/math/pages/EM-035-01';
import { Box, EStyleFontSizes, ETagLine, IQuestionProps, Image, List, SvgIcon, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03000440_store } from './store';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {};
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        &nbsp;{'관계있는 것끼리 이어 보세요.'}
      </Box>
    ),
  };
  const info = {
    direction: 'vertical' as const,
    lines: {
      left: ['18÷6=3', '27÷3=9', '54÷9=6'],
      right: ['6×9=54', '6×3=18', '3×9=27'],
    },
  };

  const pageNumber = 'P01';
  const pageKey = pageNumber.toLowerCase() as 'p01';
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
  const [cardData, setCardData] = useRecoilState(C03000440_store);
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
    '18÷6=3을 곱셈식으로 나타내면 6×3=18입니다.',
    '27÷3=9를 곱셈식으로 나타내면 3×9=27입니다.',
    '54÷9=6을 곱셈식으로 나타내면 6×9=54입니다.',
  ];

  return (
    <>
      <AnswerTagBox marginTop={0} label='답안'>
        <Image src='/C03/0004/40/C-EM31-03-0004-4001.png' alt='답안 이미지 입니다.' />
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
