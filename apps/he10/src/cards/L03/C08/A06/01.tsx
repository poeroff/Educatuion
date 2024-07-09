import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE02301, { IHE02301Info, Idata } from '@maidt-cntn/pages/HE-023-01';
import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C08A06 } from './store';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';

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
  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words for (1) ~ (3).',
    mark: cardData.p01.isSubmitted ? (cardData.p01.values === cardData.p01.solution ? 'correct' : 'incorrect') : 'none',
  };
  const text = (
    <>
      When we think about visiting a theme park, rarely do we{' '}
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }} useGap={false}>
        (1) miss / missing
      </Typography>{' '}
      the chance to take a ride on a roller coaster. These popular rides offer thrilling ups and downs that many people enjoy. However, seldom
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (2) do we think / we do think
      </Typography>
      about the scientific principles applied in these machines. Since roller coasters have no engines, their movement relies solely on the potential
      energy they gain at the top of the first hill they go up. When a roller coaster goes down a hill due to gravity, this energy is converted into
      the kinetic energy. Thanks to this scientific principle, it is possible for us
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (3) enjoying / to enjoy
      </Typography>
      these exciting rides!
    </>
  );

  const data: Idata[] = [
    { num: '(1)', dropdownList: ['miss', 'missing'] },
    { num: '(2)', dropdownList: ['do we think', 'we do think'] },
    { num: '(3)', dropdownList: ['enjoying', 'to enjoy'] },
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
