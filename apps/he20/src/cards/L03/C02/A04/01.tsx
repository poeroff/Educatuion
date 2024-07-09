import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  Label,
  Recorder,
  IAudioPlayerProps,
  SimpleAudioPlayer,
  BoxWrap,
  EStyleButtonTypes,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IQuestionProps,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useRef } from 'react';

import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L03C02A04 } from './store';
import { studentAtom } from '@/stores/student';
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
    ],
  },
];

const P01 = () => {
  const pageKey = 'p01';
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L03C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const isAllFilled = useMemo(() => Object.values(cardData[pageKey].audioData ?? {}).every(val => val), [cardData, pageKey]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Your Turn',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Listen to the dialogue and repeat.',
  };

  const audioPrefix = '/L03/C02/A04/HE2-L03-C02-A04';
  const audioSurfix = '.mp3';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: audioPrefix + audioSurfix,
    onChangeStatus: (isPlaying: boolean) => {
      if (isPlaying) {
        handleAudioReset(0);
      }
    },
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <>Do you enjoy art?</>,
      audioSrc: audioPrefix + '-1' + audioSurfix,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <>
          <Box>Yes, I do.</Box>
          In fact, I recently&nbsp;
          <Typography weight='var(--font-weight-extraBold)' useGap={false}>
            went to an art exhibition
          </Typography>
          .
        </>
      ),
      audioSrc: audioPrefix + '-2' + audioSurfix,
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <>That sounds interesting. How was it?</>,
      audioSrc: audioPrefix + '-3' + audioSurfix,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <>
          It was{' '}
          <Typography weight='var(--font-weight-extraBold)' useGap={false}>
            fantastic
          </Typography>
          ! I was especially impressed by&nbsp;
          <Typography weight='var(--font-weight-extraBold)' useGap={false}>
            the&nbsp;
          </Typography>
          <Typography weight='var(--font-weight-extraBold)' useGap={false}>
            works of modern artists
          </Typography>
          .
        </>
      ),
      audioSrc: audioPrefix + '-4' + audioSurfix,
    },
  ];

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L03/C02/A04',
      changeData,
      mainKey: 1,
      page: pageKey,
      setFunction: setCardData,
      subjectCode: 'HE20',
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

    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNo)?.userSubmission[0].inputData ?? [];
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageNo, userSubmission);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
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

      initData(pageNo, userSubmissionList ?? defaultSubmission, defaultSubmission, isSubmitted);
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={onSubmitAnswer}
      submitDisabled={cardData[pageKey].isSubmitted || !isAllFilled}
      submitLabel='완료하기'
      submitBtnColor={
        !isAllFilled ? EStyleButtonTypes.SECONDARY : !cardData[pageKey].isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
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
