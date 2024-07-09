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
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';

import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

import { Container } from '@maidt-cntn/ui/en';
import { L02C02A06 } from './store';

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
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 4,
        type: 'BOOLEAN',
        value: false,
      },
    ],
  },
];

const P01 = () => {
  const pageKey = 'P01';
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L02C02A06);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const listenSubkeyDump = Object.keys(cardData[pageKey].audioData!).length;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meSmallTalk',
    headerText: 'B',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 대화문을 듣고, 따라 말해 보세요.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: 'What is Jisu doing?',
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C02/A06/ME1-L02-C02-A06-P01-1.mp3',
    },
    {
      type: 'B',
      content: `She's drinking water.`,
      color: 'var(--color-orange-200)',
      audioSrc: '/L02/C02/A06/ME1-L02-C02-A06-P01-2.mp3',
    },
  ];

  const isSubmitDisabled =
    Object.values(cardData[pageKey].audioData!).some(data => !data || Object.keys(data).length === 0) ||
    Object.values(cardData[pageKey].listenComplete!).some(v => !v);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L02/C02/A06',
      changeData,
      mainKey: 1,
      page: pageKey,
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
    });
  };

  const handleSubmit = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageKey)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageKey)!.userSubmission[0].inputData;
    }
    handleAudioReset(0);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageKey, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: subjectCode,
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            isSubmitted,
            listenComplete: {
              1: userSubmissionList[0]?.inputData[1 + listenSubkeyDump] || cardData[pageKey].listenComplete?.[1],
              2: userSubmissionList[0]?.inputData[2 + listenSubkeyDump] || cardData[pageKey].listenComplete?.[2],
            },
            audioData: newAudioData,
          },
        }));
      }

      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleAudioEnded = (index: number) => {
    if (cardData[pageKey].listenComplete?.[index]) {
      return;
    }

    const newListenComplete = { ...cardData[pageKey].listenComplete };
    newListenComplete[index] = true;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listenComplete: newListenComplete,
      },
    }));
    changeData(pageKey, 1, index + listenSubkeyDump, true);
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
      saveData(pageKey);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      submitDisabled={cardData[pageKey].isSubmitted || isSubmitDisabled}
      submitBtnColor={cardData[pageKey].isSubmitted || isSubmitDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='center'>
        <List data={data} gap={20}>
          {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
            <BoxWrap>
              <Box marginRight='8px' vAlign='center'>
                <Label value={value?.type} type={'paint'} background={value?.color} />
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
                  initialData={cardData[pageKey].audioData?.[index]}
                  readOnly={cardData[pageKey].isSubmitted}
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
