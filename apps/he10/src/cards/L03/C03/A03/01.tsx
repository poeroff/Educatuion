import { useEffect, useRef } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  Label,
  Recorder,
  IAudioPlayerProps,
  EStyleButtonTypes,
  SimpleAudioPlayer,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C03A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc?: string;
}

const P01 = () => {
  const currentPage = 'P01';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 1)',
  };

  const questionInfo = {
    text: 'Listen to the dialogue and repeat.',
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 4,
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 5,
          type: 'RECORDER',
          value: {},
        },
        {
          subKey: 6,
          type: 'RECORDER',
          value: {},
        },
        {
          subKey: 7,
          type: 'RECORDER',
          value: {},
        },
        {
          subKey: 8,
          type: 'RECORDER',
          value: {},
        },
      ],
    },
  ];

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            isDoneRecord1: userSubmissionList[0].inputData[0]?.value || cardData.p01.isDoneRecord1,
            isDoneRecord2: userSubmissionList[0].inputData[1]?.value || cardData.p01.isDoneRecord2,
            isDoneRecord3: userSubmissionList[0].inputData[2]?.value || cardData.p01.isDoneRecord3,
            isDoneRecord4: userSubmissionList[0].inputData[3]?.value || cardData.p01.isDoneRecord4,
            audioData:
              [
                userSubmissionList[0].inputData[4]?.value,
                userSubmissionList[0].inputData[5]?.value,
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
              ] || cardData.p01.audioData,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onEventRecorder = (audioData: IAudioData, index: number, status: boolean) => {
    const isDoneRecordKeys = ['isDoneRecord1', 'isDoneRecord2', 'isDoneRecord3', 'isDoneRecord4'];

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        [isDoneRecordKeys[index]]: status,
      },
    }));

    changeData(currentPage, 1, index + 1, status);

    const userInputs = [...cardData.p01.audioData];
    userInputs[index] = audioData;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        audioData: userInputs,
      },
    }));
    changeData(currentPage, 1, index + 5, audioData);
  };

  const submitClick = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p01.isDoneRecord1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p01.isDoneRecord2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p01.isDoneRecord3,
            },
            {
              subKey: 4,
              type: 'BOOLEAN',
              value: cardData.p01.isDoneRecord4,
            },
            {
              subKey: 5,
              type: 'RECORDER',
              value: cardData.p01.audioData[0],
            },
            {
              subKey: 6,
              type: 'RECORDER',
              value: cardData.p01.audioData[1],
            },
            {
              subKey: 7,
              type: 'RECORDER',
              value: cardData.p01.audioData[2],
            },
            {
              subKey: 8,
              type: 'RECORDER',
              value: cardData.p01.audioData[3],
            },
          ],
        },
      ];
      submitData(currentPage, userSubmission);
    }
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isDoneRecord1: false,
        isDoneRecord2: false,
        isDoneRecord3: false,
        isDoneRecord4: false,
      },
    }));
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const isAnyRecordNotDone = [cardData.p01.isDoneRecord1, cardData.p01.isDoneRecord2, cardData.p01.isDoneRecord3, cardData.p01.isDoneRecord4].some(
    record => record === false,
  );

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <>
          <Typography useGap={false}>Have you heard of</Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            &nbsp;a washable keyboard
          </Typography>
          <Typography useGap={false}>?</Typography>
          <br />
          <Typography useGap={false}>It’s pretty cool.</Typography>
        </>
      ),
      audioSrc: '/L03/C03/A03/HE1-L03-C03-A03-01-1.mp3',
    },
    {
      type: 'E',
      color: 'var(--color-red-300)',
      content: (
        <>
          <Typography useGap={false}>No, I haven’t. What’s so special about it?</Typography>
        </>
      ),
      audioSrc: '/L03/C03/A03/HE1-L03-C03-A03-01-2.mp3',
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <>
          <Typography useGap={false}>You can</Typography>{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            &nbsp;wash it with water as it’s waterproof
          </Typography>
          <Typography useGap={false}>.</Typography>
        </>
      ),
      audioSrc: '/L03/C03/A03/HE1-L03-C03-A03-01-3.mp3',
    },
    {
      type: 'E',
      color: 'var(--color-red-300)',
      content: <Typography useGap={false}>Wow, that’s awesome!</Typography>,
      audioSrc: '/L03/C03/A03/HE1-L03-C03-A03-01-4.mp3',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A03/HE1-L03-C03-A03-01.mp3',
    right: 10,
    top: 10,
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      useExtend
      submitLabel='완료하기'
      submitDisabled={isAnyRecordNotDone || cardData.p01.isSubmitted}
      onSubmit={submitClick}
      submitBtnColor={isAnyRecordNotDone || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <List<IListenAndAnswer> data={data}>
        {({ value, index = 1 }) => (
          <Box hAlign='flex-start'>
            <Box useFull hAlign='flex-start'>
              <Box marginRight='8px' alignSelf='start'>
                <Label value={value?.type || ''} type={'paint'} background={value?.color} />
              </Box>
              <Typography>{value?.content}</Typography>
            </Box>

            <SimpleAudioPlayer
              ref={ref => {
                audioRefs.current[index] = ref;
              }}
              audioSrc={value?.audioSrc ?? ''}
              ariaLabel={index + '번 지문 듣기 버튼'}
              onChangeStatus={() => handleAudioReset(index)}
            />
            <Box marginLeft='4px'>
              <Recorder
                initialData={cardData.p01.audioData?.[index - 1]}
                recorderIndex={index - 1}
                onSubmit={audioData => onEventRecorder(audioData, index - 1, true)}
                onRefresh={() => onEventRecorder({}, index - 1, false)}
                readOnly={cardData.p01.isSubmitted}
                onClick={() => {
                  handleRecorderClose(index);
                  handleAudioReset(0);
                }}
                ref={ref => {
                  recorderRef.current[index] = ref;
                }}
              />
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default P01;
