import arrowRightBlue from '@/assets/icon/arrowRightBlue.svg';
import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM03801 from '@maidt-cntn/math/pages/EM-038-01';
import {
  Box,
  EStyleFontSizes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03000350_store } from './store';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>
          {'뺄셈식을 보고'}&nbsp;
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;{'안에 알맞은 수를 써넣으세요.'}
        </Box>
      </>
    ),
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
  const [cardData, setCardData] = useRecoilState(C03000350_store);
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

  const handleChange = (subKey: number, index: number, value: number[]) => {
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
    <EM03801
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
  answers: string[] | number[];
  solutions: string[] | number[];
  isSubmitted: boolean;
  onChange?: (subKey: number, index: number, value: number[]) => void;
}

const QuestionNode = ({ subKey, answers, solutions, isSubmitted, onChange }: IQuestionNode) => {
  const getInputStatus = (index: number) => (isSubmitted && answers[index] !== solutions[index] ? 'error' : undefined);

  const changeAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = isValidString(value) ? Number(value) : '';
    onChange?.(subKey, index, newAnswers as number[]);
  };

  return (
    <Box useFull type='dashed' borderRadius='16px' padding='24px'>
      <Box background='yellow' textAlign='center' useRound marginBottom={36}>
        <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
          36 - 9 - 9 - 9 - 9 = 0
        </Box>
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center' whiteSpace='nowrap'>
        <Box fontSize={22} borderRadius={50} display='flex' alignItems='center' marginRight={8}>
          <SvgIcon src={arrowRightBlue} alt='오른쪽을 가르키는 화살표 아이콘' size='44px' />
        </Box>

        <Box display='flex'>
          <Box display='flex' alignItems='center'>
            <Typography>36</Typography>
          </Box>

          <Box display='flex' alignItems='center' marginRight={16}>
            <Typography>÷</Typography>
          </Box>

          <Input
            type='number'
            width='125px'
            ariaLabel='36을 나누는 수 입력란'
            readOnly={isSubmitted}
            maxLength={3}
            status={getInputStatus(0)}
            value={String(answers[0] ?? '')}
            onChange={event => changeAnswer(0, event.target.value)}
          />

          <Box display='flex' alignItems='center'>
            <Typography>=</Typography>
          </Box>

          <Input
            type='number'
            width='125px'
            ariaLabel='36 나누기 N의 몫'
            readOnly={isSubmitted}
            maxLength={3}
            status={getInputStatus(1)}
            value={String(answers[1] ?? '')}
            onChange={event => changeAnswer(1, event.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
};

const SolutionNode = () => {
  const explains = ['36에서 9를 4번 뺄 수 있습니다.', '이것을 나눗셈식으로 나타내면 36÷9=4입니다.'];

  return (
    <>
      <AnswerTagBox marginTop={0} label='답안'>
        <Typography useGap={false}>9, 4</Typography>
      </AnswerTagBox>

      <AnswerTagBox label='풀이'>
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

export default P01;
