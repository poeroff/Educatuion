import { useEffect } from 'react';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C05A03 } from './store';

import HE1HE01301 from '@maidt-cntn/pages/HE1-HE-013-01';

const P01 = () => {
  const currentPage = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C05A03);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p01.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p01.answer === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Word Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct meaning of the underlined part.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.answer === cardData.p01.solution ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <HE1HE01301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      parts={cardData.p01.context.split(cardData.p01.underlineText)}
      underlineText={cardData.p01.underlineText}
      data={cardData.p01.data}
      isSubmitted={cardData.p01.isSubmitted}
      answer={cardData.p01.answer}
      solution={cardData.p01.solution}
      handleChange={handleChange}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;