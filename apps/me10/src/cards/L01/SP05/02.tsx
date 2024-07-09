import { Box, IAudioData, InputStatus, Textarea, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01_SP05 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { ChangeEvent, useEffect, useState } from 'react';
import HE02102 from '@maidt-cntn/pages/HE-021-02';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';

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
        {
          subKey: 2,
          type: 'TEXTAREA',
          value: cardData[pageKey].answer.value1,
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
            {
              subKey: 2,
              type: 'TEXTAREA',
              value: cardData[pageKey].answer.value1,
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
  const handleInputChangeEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = e.target;

    const value = truncateToMaxBytes(e.target.value, 2000);

    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, 2, value);
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
            answer: { value1: userSubmissionList[0].inputData[1]?.value } || cardData[pageKey].answer,
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
    iconType: 'readAndWriteDeep',
  };

  const questionInfo = {
    text: cardData[pageKey].questionText,
  };

  const textNode: React.ReactNode = (
    <Box hAlign='center' marginTop='20px'>
      <Textarea
        width='100%'
        height='300px'
        name={'value1'}
        value={cardData[pageKey].answer.value1}
        onChange={handleInputChangeEvent}
        placeholder='내용을 넣어 주세요.'
        ariaLabel='답란'
        readOnly={cardData[pageKey].isSubmitted}
        status={cardData[pageKey].isSubmitted || isNotEmptyString(cardData[pageKey].answer.value1) ? InputStatus.ENABLE : InputStatus.DEFAULT}
      />
    </Box>
  );

  return (
    <HE02102
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      textNode={textNode}
      answer={cardData[pageKey].answer}
      solution={cardData[pageKey].solution}
      onRecordEnd={handleRecordEnd}
      onSubmit={submitAnswer}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P02;
