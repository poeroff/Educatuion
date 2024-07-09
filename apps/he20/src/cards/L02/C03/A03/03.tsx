import {
  TMainHeaderInfoTypes,
  Typography,
  Input,
  InputStatus,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  IAudioPlayerProps,
  makeAudioData,
} from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C03A03 } from '@/cards/L02/C03/A03/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { pageDataAtom } from '@/stores/page';
import HE09001 from '@maidt-cntn/pages/HE-009-01-API';

interface IListenAndAnswer {
  type: string;
  conversationType: string;
  content: React.ReactNode;
  color?: string;
  audioSrc?: string;
}

const P03 = () => {
  const pageNumber = 'P03';
  const pageKey = 'p03';
  const cardPath = 'L02/C03/A03';
  const subjectCode = 'HE20';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A03);
  const { userId } = useRecoilValue(studentAtom);

  const recorderProcessInfo: IRecordRefSubmitFunctionProps[] = [
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
      subKey: 4,
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
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 4,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value5,
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value6,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = truncateToMaxBytes(e.target.value);
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
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const handleListeningEnd = (subKey: number) => {
    const userInputs = [...(cardData[pageKey].listeningData || [])];
    userInputs[(subKey - 1) / 2] = true;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listeningData: userInputs,
      },
    }));
    changeData(pageNumber, 1, subKey, true);
  };

  const submitAnswer = () => {
    if (!cardData[pageKey].isSubmitted) {
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
    }
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
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer:
              {
                value5: userSubmissionList[0].inputData[4]?.value,
                value6: userSubmissionList[0].inputData[5]?.value,
              } || cardData[pageKey].answer,
            listeningData: [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[2]?.value] || cardData[pageKey].listeningData,
            audioData: newAudioData,
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
    headerText: 'Your Turn (Step 3)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write your own scripts and do a role-play.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <>
          <Typography useGap={false}>Have you visited the new</Typography>
          <Typography weight='var(--font-weight-bold)'>swimming pool</Typography>
          <Typography useGap={false}>{` in our town?`}</Typography>
        </>
      ),
      color: 'var(--color-blue-100)',
      conversationType: 'listen',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-1.mp3',
    },
    {
      type: 'You',
      content: <Typography useGap={false}>Yes, I have.</Typography>,
      color: 'var(--color-orange-100)',
      conversationType: 'speak',
    },
    {
      type: 'A',
      content: <Typography useGap={false}>What did you think?</Typography>,
      color: 'var(--color-blue-100)',
      conversationType: 'listen',
      audioSrc: '/L02/C03/A03/HE2-L02-C03-A03-01-3.mp3',
    },
    {
      type: 'You',
      content: (
        <>
          <Typography useGap={false}>
            I was pretty satisfied with it.{' '}
            <Input
              placeholder='e.g. It has exciting slides.'
              ariaLabel='1번 답란'
              width='310px'
              maxLength={2000}
              inputSize='x-small'
              onChange={handleInputChangeEvent}
              name={'value5'}
              value={cardData[pageKey]?.answer?.value5}
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey]?.answer?.value5 ?? '')
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
            />
            .
          </Typography>
          <Typography useGap={false} usePre style={{ marginTop: '5px' }}>
            {`I wasn’t that satisfied with it. `}
            <Input
              placeholder='e.g. It was too crowded.'
              ariaLabel='2번 답란'
              minWidth='310px'
              maxLength={50}
              inputSize='x-small'
              onChange={handleInputChangeEvent}
              name={'value6'}
              value={cardData[pageKey]?.answer?.value6}
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey]?.answer?.value6 ?? '')
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
            />
            .
          </Typography>
        </>
      ),
      color: 'var(--color-orange-100)',
      conversationType: 'speak',
    },
  ];

  return (
    <HE09001
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      data={data}
      listeningData={cardData[pageKey].listeningData}
      audioData={cardData[pageKey].audioData}
      onListeningEnd={handleListeningEnd}
      recorderProcessInfo={recorderProcessInfo}
      onSubmit={submitAnswer}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P03;
