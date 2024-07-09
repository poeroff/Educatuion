import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import HE00401, { IApiInfo } from '@maidt-cntn/pages/HE-004-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, TMarkType } from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C11A02 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A02);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = cardData.p01.solution;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '1. What are the speakers mainly talking about?',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C11/A02/HE2-L01-C11-A02.mp3',
    captionSrc: '/L01/C11/A02/HE2-L01-C11-A02.srt',
  };

  const data: IHE00401Data[] = [
    {
      text: 'tips for learning English',
    },
    {
      text: 'a volunteering trip abroad',
    },
    {
      text: 'the way to be a good translator',
    },
    {
      text: 'volunteer work for summer vacation',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: null,
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => cardData[pageKey].selectedIdx === answer - 1, [cardData[pageKey].selectedIdx]);
  useEffect(() => {
    if (cardData[pageKey].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageKey].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            selectedIdx: userSubmissionList[0].inputData[0]?.value || prev[pageKey].selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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

  const apiInfo: IApiInfo = {
    pageId: pageNumber,
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === answer - 1 ? 'correct' : 'incorrect');
  };

  return (
    <HE00401
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      answer={answer}
      changeMark={handleChangeMark}
      data={data}
    />
  );
};

export default P01;
