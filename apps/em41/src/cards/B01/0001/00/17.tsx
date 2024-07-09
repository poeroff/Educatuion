import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM05201 from '@maidt-cntn/math/pages/EM-052-01';
import { Box, EStyleFontSizes, IQuestionProps, Input, InputStatus, Label, Typography } from '@maidt-cntn/ui';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';

const P17 = () => {
  const pageNumber = 'P17';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='17' type='icon' />
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
    <Typography size={EStyleFontSizes['X-MEDIUM']}>
      한 명에게&nbsp;
      <Box display='inline-block' border='1px solid var(--color-grey-600)' textAlign='center' width='98px' padding='6px 12px' borderRadius={8}>
        <Label value='ㄱ' />
      </Box>
      권씩 나누어 줄 수 있고,&nbsp;
      <Box display='inline-block' border='1px solid var(--color-grey-600)' textAlign='center' width='98px' padding='6px 12px' borderRadius={8}>
        <Label value='ㄴ' />
      </Box>
      권이 남았습니다.
    </Typography>
  );
  const answerNode = (
    <>
      <Box>
        <Label value='ㄱ' />
        <Input
          width='98px'
          ariaLabel='ㄱ 답의 입력란'
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
      <Typography>,</Typography>
      <Box>
        <Label value='ㄴ' />
        <Input
          width='98px'
          ariaLabel='ㄴ 답의 입력란'
          marginLeft={8}
          maxLength={4}
          name={'value2'}
          value={cardData[pageNumber].answer.value2.toString()}
          onChange={handleInputChangeEvent}
          readOnly={cardData[pageNumber].isSubmitted}
          status={
            cardData[pageNumber].isSubmitted
              ? !cardData[pageNumber].isCorrect[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageNumber].answer.value2)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
        />
      </Box>
    </>
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
    <EM05201
      questionInfo={questionInfo}
      questionNode={questionNode}
      answerNode={answerNode}
      imageSrc={cardData[pageNumber].imageSrc}
      imageAlt={cardData[pageNumber].imageAlt}
      answer={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
      submitType={'marking'}
      isSubmitted={cardData[pageNumber].isSubmitted}
    />
  );
};

export default P17;
