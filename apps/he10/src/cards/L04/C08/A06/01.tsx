import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE02902, { IHE02902Info, Idata } from '@maidt-cntn/pages/HE-029-02';
import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L04C08A06 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A06);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar in Reading',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the one with a grammatical error and correct it.',
  };

  const text = (
    <>
      All day long at school, Jennie couldn’t stop thinking about the newly opened cake shop. Right after school, she rushed to the shop in the
      pouring rain with her mind
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (1) filled
      </Typography>
      with excitement. Entering the store with her clothes wet from the rain, she was fascinated by the beautiful cakes on display. She grabbed a
      banana cake, with her eyes already
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (2) searched
      </Typography>
      for her next target. Being a chocolate lover, she picked up
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (3) not only
      </Typography>
      a chocolate roll but some chocolate cookies. With a delighted smile, she finally made her way to the counter.
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
      questionInformation={questionInfo}
      info={info}
      value={cardData.p01.values}
      handleOnChange={handleOnChange}
      isSubmitted={cardData.p01.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;
