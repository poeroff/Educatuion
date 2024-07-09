import { useEffect } from 'react';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import ME12603 from '@maidt-cntn/pages/ME-126-03';
import { IQuestionProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C12A02, wordArr } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L02C12A02);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const pageNo = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Expressions',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 빈칸에 알맞은 말을 골라 써 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const isCorrect = isAnswer(cardData.p01.answer, cardData.p01.solution);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const question = (
    <>
      <Typography>His</Typography>
      <Input
        value={cardData.p01.answer}
        onChange={e => handleChange(e.target.value)}
        placeholder='내용을 넣어 주세요.'
        ariaLabel='답 입력란'
        width='255px'
        maxLength={30}
        readOnly={cardData.p01.isSubmitted}
        status={!cardData.p01.isSubmitted ? '' : !isAnswer(cardData.p01.answer, cardData.p01.solution) ? InputStatus.ERROR : InputStatus.ENABLE}
      />
      <Typography>clock goes off at 7 o’clock in the morning.</Typography>
    </>
  );

  return (
    <ME12603
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      wordArr={wordArr}
      question={question}
      answer={cardData.p01.answer}
      solution={cardData.p01.solution}
      isSubmitted={cardData.p01.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;
