import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, IQuestionProps, Input, Label, Typography, EStyleFontSizes, InputStatus } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03000804 } from './store';
import EM03901 from '@maidt-cntn/math/pages/EM-039-01';
import { getMarking, isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { MathExpression } from '@maidt-cntn/ui/math';

const P06 = () => {
  const pageNumber = 'P06';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A03000804);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='6' type='icon' />
        {cardData[pageNumber].questionText}
      </>
    ),
    mark: getMarking(cardData[pageNumber].isSubmitted, cardData[pageNumber].isCorrect),
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!['ㄱ', 'ㄴ', 'ㄷ', ''].includes(value)) {
      return;
    }

    if (index === 0) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer1: value } }));
    } else if (index === 1) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer2: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer3: value } }));
    }

    changeData(pageNumber, 1, index + 1, value);
  };

  const questionNode = (
    <Box hAlign={'center'}>
      <Typography size={EStyleFontSizes['MEDIUM']}>
        <MathExpression equation={`㉠ 72$\\div$9`} />
      </Typography>

      <Typography size={EStyleFontSizes['MEDIUM']}>
        <MathExpression equation={`㉡ 27$\\div$3`} />
      </Typography>

      <Typography size={EStyleFontSizes['MEDIUM']}>
        <MathExpression equation={`㉢ 30$\\div$6`} />
      </Typography>
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
        value={cardData[pageNumber].answer1}
        onChange={e => handleInputChangeEvent(e, 0)}
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted
            ? cardData[pageNumber].answer1 !== cardData[pageNumber].solution1
              ? InputStatus.ERROR
              : InputStatus.ENABLE
            : !isNotEmptyString(cardData[pageNumber].answer1)
            ? InputStatus.DEFAULT
            : InputStatus.ENABLE
        }
      />
      ,
      <Input
        width='98px'
        ariaLabel='입력란'
        marginLeft={8}
        maxLength={4}
        name={'value1'}
        value={cardData[pageNumber].answer2}
        onChange={e => handleInputChangeEvent(e, 1)}
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted
            ? cardData[pageNumber].answer2 !== cardData[pageNumber].solution2
              ? InputStatus.ERROR
              : InputStatus.ENABLE
            : !isNotEmptyString(cardData[pageNumber].answer2)
            ? InputStatus.DEFAULT
            : InputStatus.ENABLE
        }
      />
      ,
      <Input
        width='98px'
        ariaLabel='입력란'
        marginLeft={8}
        maxLength={4}
        name={'value1'}
        value={cardData[pageNumber].answer3}
        onChange={e => handleInputChangeEvent(e, 2)}
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted
            ? cardData[pageNumber].answer3 !== cardData[pageNumber].solution3
              ? InputStatus.ERROR
              : InputStatus.ENABLE
            : !isNotEmptyString(cardData[pageNumber].answer3)
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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];
  const submitAnswer = () => {
    const isCorrect =
      cardData[pageNumber].answer1 === cardData[pageNumber].solution1 &&
      cardData[pageNumber].answer2 === cardData[pageNumber].solution2 &&
      cardData[pageNumber].answer3 === cardData[pageNumber].solution3;

    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageNumber].answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData[pageNumber].answer3,
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
            answer1: userSubmissionList[0].inputData[0]?.value || '',
            answer2: userSubmissionList[0].inputData[1]?.value || '',
            answer3: userSubmissionList[0].inputData[2]?.value || '',
            isCorrect: userSubmissionList[0].isCorrect ? userSubmissionList[0].isCorrect : false,
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
      answer={{ value1: cardData[pageNumber].answer1, value2: cardData[pageNumber].answer2, value3: cardData[pageNumber].answer3 }}
      solution={{ value1: cardData[pageNumber].solution1, value2: cardData[pageNumber].solution2, value3: cardData[pageNumber].solution3 }}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
      submitType={'marking'}
      isSubmitted={cardData[pageNumber].isSubmitted}
    />
  );
};

export default P06;
