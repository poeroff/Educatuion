import { useEffect, useRef, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Typography,
  List,
  Box,
  Label,
  SimpleAudioPlayer,
  IAudioPlayerProps,
  IQuestionProps,
  EStyleButtonTypes,
  IRecorderRef,
  IUploadRecordData,
  ISimpleAudioPlayerRef,
  Recorder,
  IAudioData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C03A03 } from './store';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

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
    ],
  },
];

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();

  const [cardData, setCardData] = useRecoilState(L01C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    onChangeStatus: (isPlaying: boolean) => {
      if (isPlaying) {
        handleAudioReset(0);
      }
    },
    audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01.mp3',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Listen to the dialogue and repeat.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <Typography weight={'var(--font-weight-bold)'}>I feel nervous when I give a persentation.</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01-1.mp3',
    },
    {
      type: 'B',
      content: <Typography>I know how you feel. You'll figure it out, though.</Typography>,
      color: 'var(--color-red-300)',
      audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01-2.mp3',
    },
    {
      type: 'A',
      content: <Typography>That’s comforting. Can you give me some advice?</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01-3.mp3',
    },
    {
      type: 'B',
      content: (
        <Box>
          <Box vAlign='center'>
            <Typography>Why don’t you</Typography>
            <Typography weight={'var(--font-weight-bold)'} useGap={false}>
              practice speaking in front of
            </Typography>
          </Box>
          <Box vAlign='center'>
            <Typography weight={'var(--font-weight-bold)'}>your family?</Typography>
            <Typography useGap={false}> It can help!</Typography>
          </Box>
        </Box>
      ),
      color: 'var(--color-red-300)',
      audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01-4.mp3',
    },
  ];

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
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

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitAnswer = () => {
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
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData('P01', userSubmission);
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

  return (
    <Container
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={cardData.p01.isSubmitted || !Object.values(cardData.p01.audioData!).every(value => value && Object.keys(value).length > 0)}
      onSubmit={onSubmitAnswer}
      submitBtnColor={
        !Object.values(cardData.p01.audioData!).every(value => value && Object.keys(value).length > 0)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <Box hAlign='space-between' gap='10px'>
            <Box vAlign='baseline'>
              <Label value={value?.type || ''} type={'paint'} background={value?.color} marginRight={8} />
              {value?.content}
            </Box>
            <Box vAlign='center' gap='4px'>
              <SimpleAudioPlayer
                ref={ref => {
                  audioRefs.current[index] = ref;
                }}
                audioSrc={value?.audioSrc ?? ''}
                ariaLabel={index + '번 지문 듣기 버튼'}
                onChangeStatus={() => handleAudioReset(index)}
              />
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
