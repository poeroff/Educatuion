import {
  TMainHeaderInfoTypes,
  Typography,
  List,
  Box,
  Label,
  SimpleAudioPlayer,
  Recorder,
  IAudioPlayerProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  EStyleButtonTypes,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
}

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
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 6,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 7,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 8,
        type: 'BOOLEAN',
        value: false,
      },
    ],
  },
];

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L03C03A03);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const pageNumber = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Listen to the dialogue and repeat.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A03/HE2-L03-C03-A03-01.mp3',
    captionSrc: '/L03/C03/A03/HE2-L03-C03-A03-01.srt',
    onChangeStatus: (isPlaying: boolean) => {
      if (isPlaying) {
        handleAudioReset(0);
      }
    },
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <Typography useGap={false}>
          Are there any rules to follow in{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            the theater?
          </Typography>
        </Typography>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L03/C03/A03/HE2-L03-C03-A03-01-1.mp3',
    },
    {
      type: 'B',
      content: (
        <Typography useGap={false} usePre>
          Yes, you’re not allowed to{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            kick the seat in
          </Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            front of you
          </Typography>
          .
        </Typography>
      ),
      color: 'var(--color-orange-200)',
      audioSrc: '/L03/C03/A03/HE2-L03-C03-A03-01-2.mp3',
    },
    {
      type: 'A',
      content: <Typography useGap={false}>I see. Thank you for the information.</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L03/C03/A03/HE2-L03-C03-A03-01-3.mp3',
    },
    {
      type: 'B',
      content: <Typography useGap={false}>My pleasure.</Typography>,
      color: 'var(--color-orange-200)',
      audioSrc: '/L03/C03/A03/HE2-L03-C03-A03-01-4.mp3',
    },
  ];

  const onListeningEnd = (index: number) => {
    const newListeningData = [...(cardData?.p01?.listeningData || Array(4).fill(false))];
    newListeningData[index] = true;

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        listeningData: newListeningData,
      },
    }));
    changeData(pageNumber, 1, 5 + index, true);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L03/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P01')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P01')!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    submitData('P01', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });
        const newListeningData = userSubmissionList[0].inputData.slice(4, 8).map((data: { value: boolean }) => data?.value);
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
            listeningData: newListeningData.length > 0 ? newListeningData : cardData.p01.listeningData,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const onEventListening = (index: number) => {
    onListeningEnd && onListeningEnd(index);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const checkDisableInput = useMemo(() => {
    return (
      (cardData?.p01?.listeningData && cardData?.p01?.listeningData.some(value => !value)) || Object.values(cardData.p01.audioData!).length !== 4
    );
  }, [cardData?.p01?.listeningData, cardData.p01.audioData]);

  return (
    <Container
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput}
      onSubmit={onSubmitAnswer}
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      useExtend
    >
      <List data={data}>
        {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
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
              onChangeStatus={() => {
                handleRecorderClose(0);
                handleAudioReset(index);
              }}
              onEnded={() => onEventListening(index - 1)}
            />
            <Box marginLeft='4px'>
              <Recorder
                recorderIndex={index}
                initialData={cardData.p01.audioData?.[index]}
                readOnly={cardData.p01.isSubmitted}
                onSubmit={() => {
                  onSubmitRecorder(index);
                }}
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
