import { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  Box,
  Typography,
  List,
  Label,
  EStyleButtonTypes,
  IRecorderRef,
  SimpleAudioPlayer,
  ISimpleAudioPlayerRef,
  Recorder,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C03A03 } from './store';

interface IListenAndAnswer {
  type: string;
  color: string;
  content: React.ReactNode;
  audioSrc?: string;
}

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const pageData = useRecoilValue(pageDataAtom);
  const pageNumber = 'P03';
  const pageKey = 'p03';
  const subjectCode = 'HE10';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 2)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write your own scripts and do a role-play.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
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

  const onSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];

      if (pageData.find(value => value.page === 'P03')) {
        userSubmission[0].inputData = pageData.find(value => value.page === 'P03')!.userSubmission[0].inputData;
      }
      handleAudioReset(0);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      submitData('P03', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });

        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }

      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: e.target.value } }));
    changeData('P03', 1, 1, e.target.value);
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C03/A03',
      changeData,
      mainKey: 1,
      page: pageKey,
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
    });
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#D9E8FF',
      content: (
        <Typography>
          {'I '}
          <Box display='inline-flex' fontWeight={'bold'}>
            feel nervous when I give a persentation.
          </Box>
        </Typography>
      ),
      audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01-1.mp3',
    },
    {
      type: 'You',
      color: '#FFF0CC',
      content: <Typography>I know how you feel. You'll figure it out, though.</Typography>,
    },
    {
      type: 'A',
      color: '#D9E8FF',
      content: <Typography>That’s comforting. Can you give me some advice?</Typography>,
      audioSrc: '/L01/C03/A03/HE1-L01-C03-A03-01-3.mp3',
    },
    {
      type: 'You',
      color: '#FFF0CC',
      content: (
        <>
          <Typography>Why don’t you </Typography>{' '}
          <Input
            placeholder='e.g. try deep breathing exercises'
            width='430px'
            maxLength={50}
            value={cardData.p03.answer1}
            onChange={handleInputChange}
            readOnly={cardData.p03.isSubmitted}
            ariaLabel='답 입력란'
          />{' '}
          ?<Typography>It can help!</Typography>
        </>
      ),
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={
        !(
          Object.values(cardData.p03.audioData!).every(value => {
            return Boolean(value) && Object.keys(value!).length > 0;
          }) && isNotEmptyString(cardData.p03.answer1 ?? '')
        ) || cardData.p03.isSubmitted
      }
      onSubmit={() => {
        onSubmit();
      }}
      submitBtnColor={
        !(
          Object.values(cardData.p03.audioData!).every(value => {
            return Boolean(value) && Object.keys(value!).length > 0;
          }) && isNotEmptyString(cardData.p03.answer1 ?? '')
        ) || cardData.p03.isSubmitted
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <List<IListenAndAnswer> data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            <Box>
              <Label value={value?.type || ''} type={'paint'} background={value?.color} />
            </Box>
            <Box width={'80%'}>
              <div>{value?.content}</div>
            </Box>
            <Box width={'20%'} hAlign='flex-end'>
              {value?.type === 'A' && (
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[index] = ref;
                  }}
                  onChangeStatus={() => handleAudioReset(index)}
                  audioSrc={value.audioSrc ?? ''}
                />
              )}
              {value?.type === 'You' && (
                <Recorder
                  recorderIndex={index / 2 + 1}
                  initialData={cardData.p03.audioData?.[index / 2 + 1]}
                  onSubmit={() => {
                    onSubmitRecorder(index / 2 + 1);
                  }}
                  onClick={() => {
                    handleRecorderClose(index / 2 + 1);
                    handleAudioReset(index);
                  }}
                  readOnly={cardData.p03.isSubmitted}
                  ref={ref => {
                    recorderRef.current[index / 2 + 1] = ref;
                  }}
                />
              )}
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P03;
