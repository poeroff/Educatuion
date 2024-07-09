import { useEffect } from 'react';
import HE1L02C08A05a from './HE1L02C08A05a';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A05a } from './store';
import { studentAtom } from '@/stores/student';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const pageNo = 'P02';

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
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: truncateToMaxBytes(value) } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleOnSubmit = async () => {
    if (cardData.p02.isSubmitted) {
      return;
    }

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
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
        answer={cardData.p02.solution}
        givenWord='she, have'
        text1='2. The athlete runs'
        text2=' wings on her feet.'
        userInput={cardData.p02.answer}
        onInputChange={handleInputOnChange}
        isSubmitted={cardData.p02.isSubmitted}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default P02;
