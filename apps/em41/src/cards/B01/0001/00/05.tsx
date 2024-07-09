import { Box, Input, InputStatus, IQuestionProps, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import EM03901 from '@maidt-cntn/math/pages/EM-039-01';
import { ChangeEvent, useEffect } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import arrow from '@/assets/icon/arrow_fat_right.svg';
import empty_square from '@/assets/icon/math_empty_square.svg';
import { MathExpression } from '@maidt-cntn/ui/math';

const P05 = () => {
  const pageNumber = 'P05';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNumber(value)) {
      return;
    }
    const userInputs = {
      ...cardData[pageNumber].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, mainKey, subKey, userInputs);
  };

  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value1,
            isAnswer: true,
            isCorrect: state[0],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='5' type='icon' />
        뺄셈식을 보고 나눗셈식으로 나타낸 것입니다. 빈칸에 공통으로 들어갈 수를 구해 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const answerNode: React.ReactNode[] = [
    <Input
      key={'value1'}
      name={'value1'}
      value={cardData[pageNumber].answer.value1}
      onChange={handleInputChangeEvent}
      width='180px'
      maxLength={15}
      ariaLabel='답란'
      readOnly={cardData[pageNumber].isSubmitted}
      status={
        cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
          ? InputStatus.ERROR
          : cardData[pageNumber].isSubmitted
          ? InputStatus.ENABLE
          : isNotEmptyString(cardData[pageNumber].answer.value1)
          ? InputStatus.ENABLE
          : InputStatus.DEFAULT
      }
    />,
  ];
  const questionData: React.ReactNode = (
    <Box>
      <Box hAlign='center'>
        <Typography weight={'var(--font-weight-bold)'} useGap={false} usePre={true}>
          <Box vAlign='center'>
            <MathExpression equation='$28\ -\ $' />
            <SvgIcon title='빈칸' src={empty_square} size='45px' />
            <MathExpression equation='$\ - \ $' />
            <SvgIcon title='빈칸' src={empty_square} size='45px' />
            <MathExpression equation='$\ - \ $' />
            <SvgIcon title='빈칸' src={empty_square} size='45px' />
            <MathExpression equation='$\ - \ $' />
            <SvgIcon title='빈칸' src={empty_square} size='45px' />
            <MathExpression equation='$\ = \ 0$' />
          </Box>
        </Typography>
      </Box>
      <Box hAlign='center'>
        <SvgIcon src={arrow} size='32px' style={{ margin: '0 10px', transform: 'rotate(90deg)' }} />
      </Box>
      <Box hAlign='center'>
        <Typography usePre>
          <MathExpression equation='$28\div7=4$' />
        </Typography>
      </Box>
    </Box>
  );

  return (
    <EM03901
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      questionNode={questionData}
      answer={cardData[pageNumber].answer}
      answerNode={answerNode}
      solution={cardData[pageNumber].solution}
      isSubmitted={cardData[pageNumber].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
    />
  );
};

export default P05;
