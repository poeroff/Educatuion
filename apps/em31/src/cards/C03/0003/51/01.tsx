import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM02501 from '@maidt-cntn/math/pages/EM-025-01';
import { Box, EStyleFontSizes, ETagLine, IQuestionProps, Image, Input, SvgIcon, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03000351_store } from './store';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {};
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        &nbsp;{'빵 40개를 5개씩 묶으면 모두 몇 묶음인지 구해 보세요.'}
      </Box>
    ),
  };
  const info = {
    imageSrc: '/C03/0003/51/DEC313008.png',
    imageAlt: '빵 40개가 그려진 그림입니다.',
    imageWidth: '652px',
    imageHeight: '292px',
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
  const [cardData, setCardData] = useRecoilState(C03000351_store);
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
    <EM02501
      info={info}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      questionNode={
        <QuestionNode
          subKey={1}
          answers={cardPageData.answer1}
          solutions={cardPageData.solution1}
          isSubmitted={cardPageData.isSubmitted}
          onChange={handleChange}
        />
      }
      solutionNode={<SolutionNode />}
      isAnswered={cardPageData.answer1.every(answer => String(answer).length > 0 && !isNaN(Number(answer)))}
      isSubmitted={cardPageData.isSubmitted}
      isCorrect={cardPageData.isCorrect}
      onSubmit={handleSubmit}
    />
  );
};

interface IQuestionNode {
  subKey: number;
  answers: (number | string)[];
  solutions: number[];
  isSubmitted: boolean;
  onChange?: (subKey: number, index: number, value: (number | string)[]) => void;
}

const QuestionNode = ({ subKey, answers, solutions, isSubmitted, onChange }: IQuestionNode) => {
  const getInputStatus = (index: number) => (isSubmitted && answers[index] !== solutions[index] ? 'error' : undefined);

  const changeAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = isValidString(value) ? Number(value) : '';
    onChange?.(subKey, index, newAnswers);
  };

  return (
    <Box marginTop='24px'>
      <Input
        type='number'
        width='125px'
        ariaLabel='답 입력란'
        readOnly={isSubmitted}
        status={getInputStatus(0)}
        value={String(answers[0] ?? '')}
        onChange={event => changeAnswer(0, event.target.value)}
      />
      <Typography>묶음</Typography>
    </Box>
  );
};

const SolutionNode = () => {
  return (
    <AnswerTagBox marginTop={0} label='답안'>
      <Box type='line' padding='20px 40px' useRound>
        <Image src='/C03/0003/51/DEC313008(sol).png' alt='빵 40개가 그려진 그림입니다.' width='652px' height='292px' />
      </Box>

      <Typography useGap={false}>빵 40개를 5개씩 묶으면 모두 8묶음입니다.</Typography>
    </AnswerTagBox>
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
