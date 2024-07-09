import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  ISimpleAudioPlayerRef,
  IRecorderRef,
  IUploadRecordData,
  IAudioData,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A04 } from './store';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
}

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L03C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageNo = 'P01';

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
    audioSrc: '/L03/C02/A04/HE1-L03-C02-A04.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <Typography useGap={false}>
          I wonder{' '}
          <Typography useGap={false} weight='var(--font-weight-extraBold)'>
            why the sky is blue.
          </Typography>
        </Typography>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L03/C02/A04/HE1-L03-C02-A04-1.mp3',
    },
    {
      type: 'B',
      content: (
        <Typography useGap={false} weight='var(--font-weight-extraBold)'>
          Blue light from the sun spreads more easily than other colors.
        </Typography>
      ),
      color: 'var(--color-red-300)',
      audioSrc: '/L03/C02/A04/HE1-L03-C02-A04-2.mp3',
    },
    {
      type: 'A',
      content: <Typography useGap={false}>Now I see. That’s really interesting!</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L03/C02/A04/HE1-L03-C02-A04-3.mp3',
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

  const makeAudioData = async ({
    originCardData,
    userSubmissionList,
  }: {
    originCardData:
      | {
          [x: string]: IAudioData | null;
        }
      | undefined;
    userSubmissionList: userSubmissionType<IUploadRecordData>[];
  }) => {
    const newCardData: typeof originCardData = originCardData ? { ...originCardData } : {};
    for (let index = 0; index < userSubmissionList[0].inputData.length; index++) {
      const data = userSubmissionList[0].inputData[index];
      if (!data.value) continue;
      if (data.type !== 'AUDIO') continue;
      let result: string | Blob = 'TIMEOUT';
      if (data.value.uploadPath) {
        result = await fulfillWithTimeLimit(1000, 3, handleDownload('HE10', data.value.uploadPath));
        if (result !== 'TIMEOUT') {
          newCardData[data.subKey] = {
            blob: [result as Blob],
            convertedText: data.value.convertedText,
            recordingTime: data.value.recordingTime,
            totalAudioVolumes: data.value.totalAudioVolumn,
          };
        }
      }
    }
    return newCardData;
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
      cardPath: 'L03/C02/A04',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE10',
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

  const checkDisableInput = () => {
    return Object.values(cardData.p01.audioData!).length !== 3;
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmitAnswer}
      audioInfo={audioInfo}
      submitLabel='완료하기'
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput()}
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      useExtend
    >
      <Box hAlign='center'>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap>
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
              </Box>
              <Box width={'70%'}>{value?.content}</Box>
              <Box width={'30%'} hAlign='flex-end'>
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[index] = ref;
                  }}
                  audioSrc={value?.audioSrc ?? ''}
                  ariaLabel={index + '번 지문 듣기 버튼'}
                  onChangeStatus={() => handleAudioReset(index)}
                />
                &nbsp;
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
        />
      </Box>
    </Container>
  );
};

export default P01;
