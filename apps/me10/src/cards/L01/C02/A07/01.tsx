import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IAudioData,
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

import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A07 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
}

const P01 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L01C02A07);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageNo = 'P01';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '강조된 부분에 유의하여 듣고, 따라 말해 봅시다.',
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
      ],
    },
  ];

  const data: IListenAndAnswer[] = [
    {
      type: '',
      content: (
        <>
          <Box hAlign='start'>
            <Box padding='19px 11px'>
              <Label background='var(--color-blue-100)' shape='square' value={1} />
            </Box>
            <Box>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-extraBold)'} color='var(--color-required)'>
                    I am
                  </Typography>
                  &nbsp;Judy.
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-extraBold)'} color='var(--color-required)'>
                    I'm
                  </Typography>
                  &nbsp;Judy.
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ),
      color: '',
      audioSrc: '/L01/C02/A07/ME1-L01-C02-A07-P01.mp3',
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
            isAudioPlayed: [userSubmissionList[0].inputData[0].value || cardData.p01.isAudioPlayed?.[0] || false],
            isRecordDone: isSubmitted ? Array<boolean>(1).fill(true) : prev.p01.isRecordDone,
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
      cardPath: 'L01/C02/A07',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: subjectCode,
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

  const checkDisableInput = () => {
    return (
      cardData.p01.answer?.some(val => val === '') ||
      Object.values(cardData.p01.audioData!).length !== 1 ||
      !cardData.p01.isRecordDone?.every(val => val) ||
      cardData.p01.isSubmitted
    );
  };

  const handleAudioEnded = (subKey: number) => {
    const newIsAudioPlayed = (cardData.p01.isAudioPlayed || []).map((v, i) => (i === subKey - 1 ? true : v));
    setCardData(prev => ({
      ...prev,
      p01: { ...prev.p01, isAudioPlayed: newIsAudioPlayed },
    }));
    changeData(pageNo, 1, subKey, true);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput()}
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
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
                    onEnded={() => handleAudioEnded(index as number)}
                  />
                </Box>
                <Recorder
                  recorderIndex={index}
                  initialData={cardData.p01.audioData}
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
