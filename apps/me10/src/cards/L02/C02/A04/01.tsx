import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IQuestionProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Label,
  List,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-008-01';
import { useEffect, useRef } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L02C02A04 } from './store';

const P01 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const pageKey = 'p01';
  const pageNo = 'P01';
  const cardPath = 'L02/C02/A04';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

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
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meSmallTalk',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 대화문을 듣고, 따라 말해 보세요.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-200)',
      content: (
        <Box>
          <Typography useGap={false}>What’s the weather like today?</Typography>
        </Box>
      ),
      audioSrc: '/L02/C02/A04/ME1-L02-C02-A04-P01-1.mp3',
    },
    {
      type: 'B',
      color: 'var(--color-orange-100)',
      content: (
        <Box>
          <Typography useGap={false}>It's sunny.</Typography>
        </Box>
      ),
      audioSrc: '/L02/C02/A04/ME1-L02-C02-A04-P01-2.mp3',
    },
  ];

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleAudioResetForRecord = () => {
    audioRefs.current.forEach((ref, idx) => {
      ref?.changePlayStatus(false);
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          subjectCode: subjectCode,
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
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

    handleAudioReset(1);
    handleAudioReset(2);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageNo, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: index,
      userId,
      setFunction: setCardData,
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={
        cardData[pageKey].isSubmitted ||
        !Object.values(cardData[pageKey]?.audioData ?? {}).every(value => {
          return value && Object.keys(value).length > 0;
        })
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={
        cardData[pageKey].isSubmitted ||
        !Object.values(cardData[pageKey]?.audioData ?? {}).every(value => {
          return value && Object.keys(value).length > 0;
        })
      }
      onSubmit={onSubmitAnswer}
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap paddingBottom={40}>
            <Box>
              <Label value={value?.type || ''} type={'paint'} background={value?.color} />
            </Box>
            <Box useFull>
              <div>{value?.content}</div>
            </Box>
            <Box hAlign='flex-end' gap='6px'>
              <SimpleAudioPlayer
                audioSrc={value?.audioSrc ?? ''}
                ariaLabel={(index === 1 ? 'A' : 'B') + '번 지문 듣기 버튼'}
                onChangeStatus={() => handleAudioReset(index)}
                ref={ref => {
                  audioRefs.current[index] = ref;
                }}
              />

              <Recorder
                recorderIndex={index}
                initialData={cardData[pageKey].audioData?.[index]}
                readOnly={cardData[pageKey].isSubmitted}
                onSubmit={() => {
                  onSubmitRecorder(index);
                }}
                onClick={() => {
                  handleAudioResetForRecord();
                  handleRecorderClose(index);
                }}
                ref={ref => {
                  recorderRef.current[index] = ref;
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
