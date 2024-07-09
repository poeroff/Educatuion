import Template from '@maidt-cntn/pages/HE1-L02-C06-A03-P02';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C06A03 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (1)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q1. Choose the one to fill in the blank.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.answer === cardData.p02.solution ? 'correct' : 'incorrect') : 'none',
  };

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p02.answer === cardData.p02.solution;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: cardData.p02.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Template
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      data={cardData.p02.data}
      question={cardData.p02.question}
      answer={cardData.p02.answer}
      solution={cardData.p02.solution}
      dialog={cardData.p02.dialog}
      isSubmitted={cardData.p02.isSubmitted}
      handleChange={handleChange}
      submitAnswer={submitAnswer}
    />
  );
};

export default P02;
