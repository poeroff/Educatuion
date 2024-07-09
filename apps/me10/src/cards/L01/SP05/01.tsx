import { TMainHeaderInfoTypes, Typography, IAudioData, Box } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01_SP05 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import HE02101 from '@maidt-cntn/pages/HE-021-01';

const P01 = () => {
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01_SP05);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'RECORDER',
          value: cardData[pageKey].audioData,
        },
      ],
    },
  ];
  const [isShow, setShow] = useState(false);

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'RECORDER',
              value: cardData[pageKey].audioData,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };
  const handleRecordEnd = (audioData: IAudioData) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        audioData: audioData,
      },
    }));
    changeData(pageNumber, 1, 1, audioData);
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            audioData: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].audioData,
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: cardData[pageKey].headerText,
    iconType: 'listenAndSpeakENG',
  };

  const questionInfo = {
    text: cardData[pageKey].questionText,
  };

  const textNode: React.ReactNode = (
    <Box hAlign='center' marginTop='20px'>
      <Box>
        <Typography>What's your favorite subject?</Typography>
      </Box>
    </Box>
  );

  return (
    <HE02101
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      textNode={textNode}
      solution={cardData[pageKey].solution}
      audioData={cardData[pageKey].audioData}
      onRecordEnd={handleRecordEnd}
      onSubmit={submitAnswer}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P01;
