import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02301, { IHE02301Info, Idata } from '@maidt-cntn/pages/HE-023-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C11A02 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C11A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '1. Choose the correct words for (1) and (2) based on the dialogue.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C11/A02/HE2-L03-C11-A02.mp3',
    captionSrc: '/L03/C11/A02/HE2-L03-C11-A02.srt',
  };

  const text = (
    <>
      The speakers are going to a
      <Typography textDecoration='underline' weight='bold' useGap={false} style={{ textUnderlinePosition: 'under' }}>
        (1) classcial concert / musical
      </Typography>
      {` `}tonight. The girl asks the boy for advice on what to be careful about
      <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (2) during / after
      </Typography>
      the performance, and he provides three tips.
    </>
  );

  const data: Idata[] = [
    { num: '(1)', dropdownList: ['classical concert', 'musical'] },
    { num: '(2)', dropdownList: ['during', 'after'] },
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
          value: cardData.p01.answer,
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p01.answer.every((a, idx = 0) => a === cardData.p01.solution[idx]);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    const originalValue = cardData.p01.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index - 1] = newValue;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newValues } }));
    }
    changeData('P01', 1, 1, newValues);
  };

  return (
    <HE02301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      info={info}
      value={cardData.p01.answer}
      dropdownWidth='230px'
      handleDropdownClick={handleDropdownClick}
      isSubmitted={cardData.p01.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;
