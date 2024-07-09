import HE02301, { IHE02301Info, Idata } from '@maidt-cntn/pages/HE-023-01';
import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L02C08A06 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A06);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P01';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar in Reading',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words for (1) ~ (3).',
    mark: cardData.p01.isSubmitted ? (cardData.p01.values === cardData.p01.solution ? 'correct' : 'incorrect') : 'none',
  };
  const text = (
    <>
      After losing a battle against the dogs, the last wolf on Earth, Max, practices being a dog. He walks and runs just like a dog. He cries and
      sings just like a dog. He even starts to think as if he
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (1) is / were
      </Typography>
      a dog. He is surprised at how
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (2) easy / easily
      </Typography>
      it is to pretend to be something else. Soon, he is ready to make his way to the Land of Dogs to pay them back. He feels as if he
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (3) wins / won
      </Typography>
      the battle without even fighting.
    </>
  );

  const data: Idata[] = [
    { num: '(1)', dropdownList: ['is', 'were'] },
    { num: '(2)', dropdownList: ['easy', 'easily'] },
    { num: '(3)', dropdownList: ['wins', 'won'] },
  ];

  const info: IHE02301Info = {
    text: text,
    data: data,
    answer: cardData.p01.solution,
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p01.values === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.values,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_ID, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            values: userSubmissionList[0].inputData[0]?.value || cardData.p01.values,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    const originalValue = cardData.p01.values;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index - 1] = newValue;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, values: newValues } }));
    }
    changeData(PAGE_ID, 1, 1, newValues);
  };

  return (
    <HE02301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      info={info}
      value={cardData.p01.values}
      handleDropdownClick={handleDropdownClick}
      isSubmitted={cardData.p01.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;
