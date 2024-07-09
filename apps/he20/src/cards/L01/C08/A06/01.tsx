import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import HE02902, { IHE02902Info, Idata } from '@maidt-cntn/pages/HE-029-02';
import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L01C08A06 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A06);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P01';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar in Reading',
    headerPattern: 'text',
  };
  const questionText = 'Choose the one with a grammatical error and correct it.';

  const text = (
    <>
      <Typography useGap={false} usePre>
        Dear Mr. Jones,
        <br />
        <br />
        This is Dr. Hopkins, and I am writing to follow up on the health examination that you completed last week. After your visit, I reviewed your
        file and observed that you
      </Typography>
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (1) had been advised
      </Typography>{' '}
      to adopt a healthier way of life following last year’s examination. Unfortunately, I haven’t noticed substantial improvement since then. You
      have gained some weight, and your blood pressure has risen considerably. Given these results, I encourage you
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (2) to make
      </Typography>{' '}
      changes to your diet and daily routine. Eat less fat and sugar and exercise at least three times a week. I advise you
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (3) aiming
      </Typography>
      <Typography useGap={false} usePre>
        for a 5% weight loss. If you have any questions, please write back.
        <br />
        <br />
        Best regards,
        <br />
        Dr. Hopkins
        <br />
      </Typography>
    </>
  );

  const data: Idata[] = [{ num: '틀린 부분' }, { num: '고친 내용' }];

  const info: IHE02902Info = {
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

  const handleOnChange = (index: number, newValue: string | undefined) => {
    const originalValue = cardData.p01.values;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index - 1] = newValue;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, values: newValues } }));
    }
    changeData(PAGE_ID, 1, 1, newValues);
  };

  return (
    <HE02902
      headerInfo={headerInfo}
      questionText={questionText}
      info={info}
      value={cardData.p01.values}
      handleOnChange={handleOnChange}
      isSubmitted={cardData.p01.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;
