import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE1L02C08A05a from './HE1L02C08A05a';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02C08A05a } from './store';
import { useEffect } from 'react';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const pageNo = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

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

  const handleInputOnChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: truncateToMaxBytes(value) } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleOnSubmit = async () => {
    if (cardData.p01.isSubmitted) {
      return;
    }

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNo, userSubmission);
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

  return (
    <>
      <HE1L02C08A05a
        answer={cardData.p01.solution}
        givenWord='it, touch'
        text1='1. Burj Khalifa in Dubai looks'
        text2=' the sky.'
        userInput={cardData.p01.answer}
        onInputChange={handleInputOnChange}
        isSubmitted={cardData.p01.isSubmitted}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default P01;
