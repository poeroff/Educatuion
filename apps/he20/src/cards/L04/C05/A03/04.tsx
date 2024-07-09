import { useEffect } from 'react';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C05A03 } from './store';
import HE1HE01301 from '@maidt-cntn/pages/HE1-HE-013-01';

const P04 = () => {
  const currentPage = 'P04';
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
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p04.isSubmitted,
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
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p04.answer === cardData.p04.solution;
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p04.answer,
            isAnswer: true,
            isCorrect: cardData.p04.isCorrect,
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
    mark: cardData.p04.isSubmitted ? (cardData.p04.answer === cardData.p04.solution ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <HE1HE01301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      parts={cardData.p04.context.split(cardData.p04.underlineText)}
      underlineText={cardData.p04.underlineText}
      data={cardData.p04.data}
      isSubmitted={cardData.p04.isSubmitted}
      answer={cardData.p04.answer}
      solution={cardData.p04.solution}
      handleChange={handleChange}
      submitAnswer={submitAnswer}
    />
  );
};

export default P04;
