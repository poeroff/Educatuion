import { useEffect } from 'react';
import HE1L02C08A05a from './HE1L02C08A05a';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A05a } from './store';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const pageNo = 'P03';

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
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: truncateToMaxBytes(value) } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleOnSubmit = async () => {
    if (cardData.p03.isSubmitted) {
      return;
    }

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
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
        answer={cardData.p03.solution}
        givenWord='they, be'
        text1='3. The child speaks to the cats'
        text2='humans.'
        userInput={cardData.p03.answer}
        onInputChange={handleInputOnChange}
        isSubmitted={cardData.p03.isSubmitted}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default P03;
