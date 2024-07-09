import {
  Recorder,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Box,
  Label,
  BoxWrap,
  SimpleAudioPlayer,
  IAudioPlayerProps,
  IQuestionProps,
  IUploadRecordData,
  IRecorderRef,
  EStyleButtonTypes,
  ISimpleAudioPlayerRef,
  makeAudioData,
} from '@maidt-cntn/ui';

import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A04 } from './store';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

import { Container } from '@maidt-cntn/ui/en';
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
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L01C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Your Turn',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Listen to the dialogue and repeat.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A04/HE1-L01-C02-A04.mp3',
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
        <>
          What do you hope for this year?
          <br />
          Personally, I hope <Typography weight='var(--font-weight-bold)'>I can complete a 5 km race.</Typography>
        </>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L01/C02/A04/HE1-L01-C02-A04-1.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          That sounds great!
          <br />I hope <Typography weight='var(--font-weight-bold)'>I'll have a chance to learn Spanish.</Typography>
        </>
      ),
      color: 'var(--color-red-300)',
      audioSrc: '/L01/C02/A04/HE1-L01-C02-A04-2.mp3',
    },
    {
      type: 'C',
      content: (
        <>
          Well, I hope <Typography weight='var(--font-weight-bold)'>my school soccer team can win first place.</Typography>
        </>
      ),
      color: 'var(--color-green-1100)',
      audioSrc: '/L01/C02/A04/HE1-L01-C02-A04-3.mp3',
    },
    {
      type: 'D',
      content: <>Great! Let's hope everything we want will come true.</>,
      color: 'var(--color-yellow-100)',
      audioSrc: '/L01/C02/A04/HE1-L01-C02-A04-4.mp3',
    },
  ];

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C02/A04',
      changeData,
      mainKey: 1,
      page: 'p01',
      subjectCode: 'HE10',
      subKey: index,
      userId,
      setFunction: setCardData,
    });
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
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

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
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

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={onSubmitAnswer}
      useExtend
      submitDisabled={cardData.p01.isSubmitted || !Object.values(cardData.p01.audioData!).every(value => value)}
      submitLabel='완료하기'
      submitBtnColor={
        !Object.values(cardData.p01.audioData!).every(value => value)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box hAlign='center'>
        <List data={data}>
          {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
            <BoxWrap>
              <Box marginRight='8px'>
                <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
              </Box>
              <Box flex={1} marginRight={10}>
                <Typography>{value?.content}</Typography>
              </Box>
              <Box hAlign='flex-end'>
                <Box marginRight='4px'>
                  <SimpleAudioPlayer
                    ref={ref => {
                      audioRefs.current[index] = ref;
                    }}
                    audioSrc={value?.audioSrc ?? ''}
                    ariaLabel={index + '번 지문 듣기 버튼'}
                    onChangeStatus={() => handleAudioReset(index)}
                  />
                </Box>
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
            </BoxWrap>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P01;
