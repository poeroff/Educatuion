import {
  TMainHeaderInfoTypes,
  Typography,
  IAudioPlayerProps,
  IQuestionProps,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import HE08001, { IListenAndAnswer } from '@maidt-cntn/pages/HE-008-01-API';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { pageDataAtom } from '@/stores/page';

const P01 = () => {
  const pageNumber = 'P01';
  const pageKey = 'p01';
  const cardPath = 'L02/C03/A03';
  const subjectCode = 'HE20';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const onListeningEnd = (index: number) => {
    const newListeningData = [...(cardData?.[pageKey]?.listeningData || Array(5).fill(false))];
    newListeningData[index] = true;

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listeningData: newListeningData,
      },
    }));
    changeData(pageNumber, 1, 6 + index, true);
  };
  const recorderProcessInfo: IRecordRefSubmitFunctionProps[] = [
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 1,
      userId,
      setFunction: setCardData,
    },
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 2,
      userId,
      setFunction: setCardData,
    },
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 3,
      userId,
      setFunction: setCardData,
    },
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 4,
      userId,
      setFunction: setCardData,
    },
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 5,
      userId,
      setFunction: setCardData,
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 3,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 4,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 5,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 6,
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 7,
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 8,
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 9,
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 10,
          type: 'BOOLEAN',
          value: {},
        },
      ],
    },
  ];

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNumber)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNumber)!.userSubmission[0].inputData;
    }
    submitData(pageNumber, userSubmission);
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          subjectCode: subjectCode,
          originCardData: cardData[pageKey]?.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });
        const newListeningData = userSubmissionList[0].inputData.slice(5, 10).map((data: { value: boolean }) => data?.value);
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            audioData: newAudioData,
            listeningData: newListeningData.length > 0 ? newListeningData : cardData[pageKey].listeningData,
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
    headerText: 'Your Turn  (Step 1)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Listen to the dialogue and repeat.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01.mp3',
    captionSrc: '/L02/C03/A03/HE2-L02-C03-A03-01.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <>
          <Typography useGap={false}>Have you visited the new</Typography>
          <Typography weight='var(--font-weight-extraBold)'>swimming pool</Typography>
          <Typography useGap={false}> in our town?</Typography>
        </>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-1.mp3',
    },
    {
      type: 'B',
      content: <Typography useGap={false}>Yes, I have.</Typography>,
      color: 'var(--color-orange-100)',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-2.mp3',
    },
    {
      type: 'A',
      content: <Typography useGap={false}>What did you think?</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-3.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <Typography useGap={false}>{`I was pretty satisfied with it.`}</Typography>
          <Typography useGap={false} weight='var(--font-weight-extraBold)'>
            {` The water was so clean.`}
          </Typography>
        </>
      ),
      color: 'var(--color-orange-100)',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-4.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <Typography useGap={false}>{`I wasn’t that satisfied with it.`}</Typography>
          <Typography useGap={false} weight='var(--font-weight-extraBold)'>
            {` The lockers were too small.`}
          </Typography>
        </>
      ),
      color: 'var(--color-orange-100)',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-5.mp3',
    },
  ];

  return (
    <HE08001
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      data={data}
      listeningData={cardData[pageKey].listeningData}
      onListeningEnd={onListeningEnd}
      audioData={cardData[pageKey].audioData}
      recorderProcessInfo={recorderProcessInfo}
      onSubmit={submitAnswer}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P01;
