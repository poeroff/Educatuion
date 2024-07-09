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
      In 2018, a soft drink company placed a vending machine in New Zealand with the phrase “Kia ora, mate” written on it. It combined the two terms
      kia ora (meaning “hello” in the Maori language) and mate (the English word) in an attempt at local marketing. Considering this an effective
      marketing strategy, the company
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (1) must / can't
      </Typography>{' '}
      have been sure of success. However, its marketing failed because mate in the Maori language means “death,” so the whole phrase could have been
      interpreted as “Hello, death.” The company{' '}
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (2) may / should
      </Typography>{' '}
      have asked Maori translators to check the phrase in advance. Marketing experts suggest that companies{' '}
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (3) exercise / exercised
      </Typography>{' '}
      caution when marketing in other languages.
    </>
  );

  const data: Idata[] = [
    { num: '(1)', dropdownList: ['must', "can't"] },
    { num: '(2)', dropdownList: ['may', 'should'] },
    { num: '(3)', dropdownList: ['exercise', 'exercised'] },
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
