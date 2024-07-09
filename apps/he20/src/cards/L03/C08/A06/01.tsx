import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE02902, { IHE02902Info, Idata } from '@maidt-cntn/pages/HE-029-02';
import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L03C08A06 } from './store';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useEffect } from 'react';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A06);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P01';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar in Reading',
    headerPattern: 'text',
  };
  const questionText = 'Choose the one with a grammatical error and correct it.';

  const text = (
    <>
      Muay Thai, a famous Thai sport, is the art of self-protection,{' '}
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (1) that
      </Typography>{' '}
      employs the hands, feet, elbows, and knees. When these body parts are skillfully used, perfect protection can be achieved. The use of the head
      was also allowed in the past{' '}
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (2) although
      </Typography>{' '}
      it is now prohibited. According to one source, Muay Thai began around the 13th century,
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (3) when
      </Typography>{' '}
      Thai natives fought many battles before settling in ancient Siam, now called Thailand. To gain an advantage in fights, they developed techniques
      to use their limbs as effective weapons.
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
