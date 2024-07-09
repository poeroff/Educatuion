import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C05A03 } from './store';
import { useEffect } from 'react';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE1HE01301 from '@maidt-cntn/pages/HE1-HE-013-01';

const P03 = () => {
  const currentPage = 'P03';
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
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p03.isSubmitted,
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
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p03.answer === cardData.p03.solution;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect: cardData.p03.isCorrect,
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
    mark: cardData.p03.isSubmitted ? (cardData.p03.answer === cardData.p03.solution ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <HE1HE01301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      parts={cardData.p03.context.split(cardData.p03.underlineText)}
      underlineText={cardData.p03.underlineText}
      data={cardData.p03.data}
      isSubmitted={cardData.p03.isSubmitted}
      answer={cardData.p03.answer}
      solution={cardData.p03.solution}
      handleChange={handleChange}
      submitAnswer={submitAnswer}
    />
  );
};

export default P03;
