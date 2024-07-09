import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import HE02301, { IHE02301Info, Idata } from '@maidt-cntn/pages/HE-023-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C11A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C11A02);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '1. Choose the appropriate words according to the dialogue',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C11/A02/HE1-L03-C11-A02.mp3',
    captionSrc: '/L03/C11/A02/HE1-L03-C11-A02.srt',
  };

  const data: Idata[] = [
    { num: '(1)', dropdownList: ['plants', 'colors'] },
    { num: '(2)', dropdownList: ['reflects', 'melts'] },
  ];

  const script = (
    <Typography>
      Sea{' '}
      <Typography useGap={false} textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (1) plants / colors
      </Typography>{' '}
      depend on which colors of light the water{' '}
      <Typography useGap={false} textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
        (2) reflects / melts
      </Typography>{' '}
      and what is in the water.
    </Typography>
  );

  const info: IHE02301Info = {
    text: script,
    data: data,
    answer: cardData.p01.solution,
  };

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    const originalValue = cardData.p01.values;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index - 1] = newValue;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, values: newValues } }));
    }
    changeData(PAGE_ID, 1, 1, newValues);
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const isCorrect = cardData.p01.values.every((val, idx) => isAnswer(val, cardData.p01.solution[idx]));
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

  return (
    <HE02301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      info={info}
      value={cardData.p01.values}
      handleDropdownClick={handleDropdownClick}
      isSubmitted={cardData.p01.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P01;
