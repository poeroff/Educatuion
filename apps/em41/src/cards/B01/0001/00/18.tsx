import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, IQuestionProps, Input, Label, Typography, EStyleFontSizes, InputStatus, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';
import EM03901 from '@maidt-cntn/math/pages/EM-039-01';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { MathExpression } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

const P18 = () => {
  const pageNumber = 'P18';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='18' type='icon' />
        {cardData[pageNumber].questionText}
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect.every(value => value) ? 'correct' : 'incorrect') : 'none',
  };
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
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const questionNode = (
    <Box hAlign={'center'}>
      <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='48px' />
      <Typography size={EStyleFontSizes['LARGE']}>
        <MathExpression equation={`$\\div4=17\\cdots1$`} />
      </Typography>
    </Box>
  );
  const commentaryNode = (
    <Box hAlign={'center'}>
      <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='38px' />
      <MathExpression equation={`$\\div4=17\\cdots1\\Rightarrow$`} />
      <Typography weight={'var(--font-weight-extraBold)'}>
        17
        <MathExpression equation={`$\\times$`} />
        4=68, 68+1=69
      </Typography>
      이므로&nbsp;
      <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='38px' />는 <Typography weight={'var(--font-weight-bold)'}>69</Typography>
      입니다.
    </Box>
  );
  const answerNode = (
    <Box>
      <Input
        width='98px'
        ariaLabel='입력란'
        marginLeft={8}
        maxLength={4}
        name={'value1'}
        value={cardData[pageNumber].answer.value1.toString()}
        onChange={handleInputChangeEvent}
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted
            ? !cardData[pageNumber].isCorrect[0]
              ? InputStatus.ERROR
              : InputStatus.ENABLE
            : !isNotEmptyString(cardData[pageNumber].answer.value1)
            ? InputStatus.DEFAULT
            : InputStatus.ENABLE
        }
      />
    </Box>
  );
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];
  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: state } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value1,
            isAnswer: true,
            isCorrect: state[0],
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value2,
            isAnswer: true,
            isCorrect: state[1],
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
            answer: {
              value1: userSubmissionList[0].inputData[0].value,
              value2: userSubmissionList[0].inputData[1].value,
            },
            isCorrect: [userSubmissionList[0].inputData[0].isCorrect, userSubmissionList[0].inputData[1].isCorrect],
            isSubmitted,
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

  return (
    <EM03901
      questionInfo={questionInfo}
      questionNode={questionNode}
      answerNode={answerNode}
      answer={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      commentaryNode={commentaryNode}
      onSubmit={submitAnswer}
      submitType={'marking'}
      isSubmitted={cardData[pageNumber].isSubmitted}
    />
  );
};

export default P18;
