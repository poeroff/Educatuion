import { useEffect, useRef } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  Label,
  Recorder,
  IAudioPlayerProps,
  SimpleAudioPlayer,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  EStyleButtonTypes,
  BoxWrap,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04C03A03 } from './store';
import usePageData from '@/hooks/usePageData';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
}

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageNum = 'P01';
  const subjectCode = 'HE20';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Listen to the dialogue and repeat.',
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const audioInfo: IAudioPlayerProps = {
    onChangeStatus: (isPlaying: boolean) => {
      if (isPlaying) handleAudioReset(0);
    },
    audioSrc: '/L04/C03/A03/HE2-L04-C03-A03-01.mp3',
    captionSrc: '/L04/C03/A03/HE2-L04-C03-A03-01.srt',
  };

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
      ],
    },
  ];

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNum)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNum)!.userSubmission[0].inputData;
    }
    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData(pageNum, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L04/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: subjectCode,
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <Typography useGap={false}>What job do you think will be popular in the future?</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L04/C03/A03/HE2-L04-C03-A03-01.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <Typography useGap={false}>I believe</Typography>{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            white-hat hackers
          </Typography>{' '}
          <Typography useGap={false}>will be one of the most</Typography> <Typography useGap={false}>popular jobs in the future.</Typography>
        </>
      ),
      color: 'var(--color-pink-200)',
      audioSrc: '/L04/C03/A03/HE2-L04-C03-A03-01-2.mp3',
    },
    {
      type: 'A',
      content: <Typography useGap={false}>Why do you think so?</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L04/C03/A03/HE2-L04-C03-A03-01-3.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <Typography useGap={false}>That’s because</Typography>{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            network security is becoming more{' '}
          </Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            important due to the rise of online threats.{' '}
          </Typography>
        </>
      ),
      color: 'var(--color-pink-200)',
      audioSrc: '/L04/C03/A03/HE2-L04-C03-A03-01-4.mp3',
    },
  ];

  const handleSetRecordComplete = (index: number, value: boolean) => {
    const newArray = [...cardData.p01!.isRecordDone!];
    newArray[index] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isRecordDone: newArray } }));
  };
  const handleSetListenComplete = (index: number, value: boolean) => {
    const newArray = [...cardData.p01!.isListenDone!];
    newArray[index] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isListenDone: newArray } }));
  };

  return (
    <Container
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={
        cardData.p01.isSubmitted || !(cardData.p01.isRecordDone?.every(value => value) && cardData.p01.isListenDone?.every(value => value))
      }
      onSubmit={onSubmitAnswer}
      useExtend
      submitBtnColor={
        cardData.p01.isSubmitted || !(cardData.p01.isRecordDone?.every(value => value) && cardData.p01.isListenDone?.every(value => value))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <List<IListenAndAnswer> data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            <Box>
              <Label value={value?.type || ''} type={'paint'} background={value?.color} />
            </Box>
            <Box width={'70%'}>
              <div>{value?.content}</div>
            </Box>
            <Box width={'30%'} hAlign='flex-end' gap='6px'>
              <SimpleAudioPlayer
                ref={ref => {
                  audioRefs.current[index] = ref;
                }}
                audioSrc={value?.audioSrc ?? ''}
                ariaLabel={index + '번 지문 듣기 버튼'}
                onChangeStatus={() => handleAudioReset(index)}
                onEnded={() => handleSetListenComplete(index - 1, true)}
              />
              <Recorder
                recorderIndex={index}
                initialData={cardData.p01.audioData?.[index]}
                readOnly={cardData.p01.isSubmitted}
                onSubmit={() => {
                  onSubmitRecorder(index);
                  handleSetRecordComplete(index - 1, true);
                }}
                onClick={() => {
                  handleRecorderClose(index);
                  handleAudioReset(0);
                }}
                ref={ref => {
                  recorderRef.current[index] = ref;
                }}
                onRefresh={() => {
                  handleSetRecordComplete(index - 1, false);
                }}
              />
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P01;
