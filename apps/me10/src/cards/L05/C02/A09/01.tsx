import {
  Recorder,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Box,
  Label,
  BoxWrap,
  SimpleAudioPlayer,
  IQuestionProps,
  IRecorderRef,
  EStyleButtonTypes,
  ISimpleAudioPlayerRef,
  IAudioData,
  IUploadRecordData,
} from '@maidt-cntn/ui';

import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

import { Container } from '@maidt-cntn/ui/en';
import { L05C02A09 } from './store';
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
        type: 'BOOLEAN',
        value: false,
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
    ],
  },
];

const P01 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L05C02A09);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'talkTogether',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 대화문을 듣고, 따라 말해보세요.',
  };

  const content: React.ReactNode[] = [
    <Typography>What are you going to do this weekend?</Typography>,
    <>
      <Typography>I’m going to play tennis.</Typography>
      <Typography>Why don’t you join me?</Typography>
    </>,
    <>
      <Typography>- Sure. That sounds great!</Typography>
      <Typography>- I’m sorry, but I can’t. I have other plans.</Typography>
    </>,
  ];

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: content[0],
      color: 'var(--color-blue-100)',
      audioSrc: '/L05/C02/A09/ME1-L05-C02-A09-P01-1.mp3',
    },
    {
      type: 'B',
      content: content[1],
      color: 'var(--color-orange-200)',
      audioSrc: '/L05/C02/A09/ME1-L05-C02-A09-P01-2.mp3',
    },
    {
      type: 'A',
      content: content[2],
      color: 'var(--color-blue-100)',
      audioSrc: '/L05/C02/A09/ME1-L05-C02-A09-P01-3.mp3',
    },
  ];
  const isEmptyAudioData = (data: IAudioData | null | undefined) => {
    return !data || Object.keys(data).length === 0;
  };

  const isSubmitDisabled = Object.values(cardData.p01.audioData!).some(isEmptyAudioData) || !cardData.p01.isAudioPlayed?.every(value => value);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L05/C02/A09',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
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
        result = await fulfillWithTimeLimit(1000, 3, handleDownload(subjectCode, data.value.uploadPath));

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

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
            isAudioPlayed: [
              userSubmissionList[0].inputData[3]?.value || cardData.p01.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[4]?.value || cardData.p01.isAudioPlayed?.[1] || false,
              userSubmissionList[0].inputData[5]?.value || cardData.p01.isAudioPlayed?.[2] || false,
            ],
            audioData: newAudioData,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
      console.log(userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleAudioEnded = (index: number) => {
    const newIsAudioPlayed = cardData.p01.isAudioPlayed?.map((v, i) => (i === index - 1 ? true : v));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isAudioPlayed: newIsAudioPlayed } }));
    changeData('P01', 1, index + 3, true);
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
      questionInfo={questionInfo}
      onSubmit={onSubmitAnswer}
      submitDisabled={cardData.p01.isSubmitted || isSubmitDisabled}
      submitLabel='완료하기'
      submitBtnColor={
        isSubmitDisabled ? EStyleButtonTypes.SECONDARY : !cardData.p01.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
      }
    >
      <Box hAlign='center'>
        <List data={data} gap={20}>
          {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
            <BoxWrap>
              <Box marginRight='8px' marginTop='8px'>
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
                    ariaLabel={index + '번 지문 듣기'}
                    onChangeStatus={() => handleAudioReset(index)}
                    onEnded={() => handleAudioEnded(index)}
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