import { useEffect } from 'react';
import HE1L02C08A05a from './HE1L02C08A05a';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A05a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P05 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const pageNo = 'P05';

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

  const handleInputOnChange = (value: string) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: truncateToMaxBytes(value) } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleOnSubmit = async () => {
    if (cardData.p05.isSubmitted) {
      return;
    }

    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer,
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
        answer={cardData.p05.solution}
        givenWord='there, be'
        text1='5. In the packed bus, they talked'
        text2=' no other people around.'
        userInput={cardData.p05.answer}
        onInputChange={handleInputOnChange}
        isSubmitted={cardData.p05.isSubmitted}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default P05;
