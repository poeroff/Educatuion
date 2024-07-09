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
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IAudioData,
  IUploadRecordData,
  EStyleButtonTypes,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useRef } from 'react';
import { L02C02A04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc?: string;
}

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L02C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageNo = 'P01';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
  };

  const questionInfo = {
    text: 'Listen to the dialogue and repeat.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A04/HE2-L02-C02-A04.mp3',
    onChangeStatus: (isPlaying: boolean) => {
      if (isPlaying) {
        handleAudioReset(0);
      }
    },
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
      cardPath: 'L02/C02/A04',
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
        <>
          Which type of{' '}
          <Typography weight={800} useGap={false}>
            computer
          </Typography>{' '}
          do you think is better,{' '}
          <Typography weight={800} useGap={false}>
            tablets
          </Typography>{' '}
          or{' '}
          <Typography weight={800} useGap={false}>
            laptops
          </Typography>
          ?
        </>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C02/A04/HE2-L02-C02-A04-1.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          Personally, I think{' '}
          <Typography weight={800} useGap={false}>
            tablets
          </Typography>{' '}
          are better than{' '}
          <Typography weight={800} useGap={false}>
            laptops
          </Typography>
          .
          <br />
          They're{' '}
          <Typography weight={800} useGap={false}>
            simpler to use.
          </Typography>{' '}
          What do you think?
        </>
      ),
      color: 'var(--color-orange-200)',
      audioSrc: '/L02/C02/A04/HE2-L02-C02-A04-2.mp3',
    },
    {
      type: 'A',
      content: (
        <>
          Well, I think{' '}
          <Typography weight={800} useGap={false}>
            laptops
          </Typography>{' '}
          are better.
          <br />
          <Typography weight={800} useGap={false}>
            They're more functional
          </Typography>
          .
        </>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C02/A04/HE2-L02-C02-A04-3.mp3',
    },
  ];

  const checkDisableInput = () => {
    return Object.values(cardData.p01.audioData!).length !== 3;
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={onSubmitAnswer}
      useExtend
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput()}
      submitLabel='완료하기'
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='center'>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap>
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
              </Box>
              <Box width={'70%'}>
                <div>{value?.content}</div>
              </Box>
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
        </List>
      </Box>
    </Container>
  );
};

export default P01;
