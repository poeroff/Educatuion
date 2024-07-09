import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A01_0008_07 } from './store';
import EM01101 from '@maidt-cntn/math/pages/EM-011-01';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0008_07);
  const { userId } = useRecoilValue(studentAtom);
  const currentPage = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathRevaluation',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '스스로 평가해 보세요.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
            },
          ],
        },
      ];
      submitData(currentPage, userSubmission);
    }
  };

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
            isSubmitted,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleAnswerChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  return (
    <EM01101
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      isSubmitted={cardData.p01.isSubmitted}
      answer={cardData.p01.answer}
      submitAnswer={submitAnswer}
      handleAnswerChange={handleAnswerChange}
    />
  );
};

export default P01;
