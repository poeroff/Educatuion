import { useEffect, useState } from 'react';

import usePageData from '@/hooks/usePageData';
import ME12603 from '@maidt-cntn/pages/ME-126-03';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IQuestionProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C12A02, wordArr } from './store';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L03C12A02);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const pageNo = 'P05';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Expressions',
  };

  const questionInfo: IQuestionProps = {
    text: '5. 빈칸에 알맞은 말을 골라 써 봅시다.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
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
    if (cardData.p05.isSubmitted) {
      return;
    }
    const isCorrect = isAnswer(cardData.p05.answer, cardData.p05.solution);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer,
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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: value } }));
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
      <Typography>I will</Typography>
      <Input
        value={cardData.p05.answer}
        onChange={e => handleChange(e.target.value)}
        placeholder='내용을 넣어 주세요.'
        ariaLabel='답 입력란'
        width='255px'
        maxLength={30}
        readOnly={cardData.p05.isSubmitted}
        status={!cardData.p05.isSubmitted ? '' : !isAnswer(cardData.p05.answer, cardData.p05.solution) ? InputStatus.ERROR : InputStatus.ENABLE}
      />
      <Typography>the ball to Rusty.</Typography>
    </>
  );

  return (
    <ME12603
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      wordArr={wordArr}
      question={question}
      answer={cardData.p05.answer}
      solution={cardData.p05.solution}
      isSubmitted={cardData.p05.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P05;
