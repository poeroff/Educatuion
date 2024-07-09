import usePageData from '@/hooks/usePageData';
import {
  TMainHeaderInfoTypes,
  Typography,
  List,
  BoxWrap,
  Box,
  Label,
  SimpleAudioPlayer,
  Recorder,
  IAudioPlayerProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  EStyleButtonTypes,
  IQuestionProps,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { L04C02A04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc?: string;
}

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageNo = 'P01';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A04/HE2-L04-C02-A04.mp3',
  };

  const questionInfo: IQuestionProps = {
    text: 'Listen to the dialogue and repeat.',
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
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

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];
    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNo)!.userSubmission[0].inputData;
    }
    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData(pageNo, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L04/C02/A04',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
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
      saveData(pageNo);
    };
  }, []);

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <Box>
          <Box vAlign={'center'}>
            <Typography>Can you show me how to</Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              mute myself during
            </Typography>
          </Box>
          <Typography weight={'var(--font-weight-bold)'}>an online meeting?</Typography>
        </Box>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L04/C02/A04/HE2-L04-C02-A04-1.mp3',
    },
    {
      type: 'B',
      content: (
        <Box>
          <Box vAlign={'center'}>
            <Typography>Sure, it’s not difficult. Just</Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              click the
            </Typography>
          </Box>
          <Typography weight={'var(--font-weight-bold)'}>microphone icon to turn off the sound.</Typography>
        </Box>
      ),
      color: 'var(--color-red-300)',
      audioSrc: '/L04/C02/A04/HE2-L04-C02-A04-2.mp3',
    },
    {
      type: 'A',
      content: <Typography>Thank you for the explanation.</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L04/C02/A04/HE2-L04-C02-A04-3.mp3',
    },
  ];

  const checkDisableInput = () => {
    return Object.values(cardData.p01.audioData!).length !== 3;
  };

  return (
    <Container
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput()}
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='center'>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap>
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
              </Box>
              <Box width={'75%'}>
                <div>{value?.content}</div>
              </Box>
              <Box width={'25%'} hAlign='flex-end'>
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
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default P01;
