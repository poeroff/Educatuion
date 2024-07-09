import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02C06A03a } from './store';

const P02 = () => {
  const pageKey = 'p02';
  const pageNumber = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A03a);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: { value1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer.value1 },
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageKey].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData[pageKey].answer.value1,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: { [name]: value } } }));
    changeData(pageNumber, 1, 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (1)',
  };
  const questionInfo = {
    text: 'Q1. Why must Nani Tama go to Murupara?',
  };
  const answer = {
    value1: 'He must go there to finish the whakapapa.',
  };
  const content = `The phone rang, and it was my dad calling from my hometown, Waituhi.
    “Can you take a week off?” he asked. “Your Nani Tama wants you here.”
    “But Dad!” I answered. “My boss won’t let me take any more time off.”
    The phone went silent, and then I heard my grandfather say faintly,
    “I need your help, Grandson. I must go to Murupara to finish the whakapapa.
    Drive me there. Hurry, I may not have much time.”
    I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll  come.”`;

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={cardData[pageKey].answer}
      answer={answer}
      onInputChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = target;
        handleInputChange(name, value);
      }}
      submitType={'complete'}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P02;
