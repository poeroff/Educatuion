import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import {
  TMainHeaderInfoTypes,
  Typography,
  List,
  BoxWrap,
  Box,
  Label,
  Input,
  Recorder,
  SimpleAudioPlayer,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  EStyleButtonTypes,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  audioSrc?: string;
  recordButton: React.ReactNode;
}

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageNum = 'P03';
  const subjectCode = 'HE20';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 3)',
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
          type: 'TEXT_LIST',
          value: ['', ''],
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

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNum)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNum)!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    submitData(pageNum, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L04/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: subjectCode,
        });

        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData(pageNum, 1, 1, updatedAnswers);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  const handleSetComplete = (index: number, value: boolean) => {
    const newArray = [...cardData.p03!.isRecordDone!];
    newArray[index] = value;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isRecordDone: newArray } }));
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <Box>
          <Typography useGap={false}>What job do you think will be popular in the future?</Typography>
        </Box>
      ),
      recordButton: (
        <SimpleAudioPlayer
          ref={ref => {
            audioRefs.current[1] = ref;
          }}
          audioSrc={'/L04/C03/A03/HE2-L04-C03-A03-01-1.mp3'}
          ariaLabel={'A의 1번 지문 듣기 버튼'}
          onChangeStatus={() => handleAudioReset(1)}
          onEnded={() => handleSetComplete(0, true)}
        />
      ),
    },
    {
      type: 'You',
      content: (
        <Box>
          <Typography useGap={false}>I believe </Typography>{' '}
          <Input
            placeholder='e.g. genetic researchers'
            width='320px'
            maxLength={50}
            value={cardData.p03.answer?.[0]}
            onChange={e => handleInputChange(0, e.target.value)}
            inputSize='x-small'
            textAlign='start'
            ariaLabel='1번 답란'
            readOnly={cardData.p03.isSubmitted}
          />
          <Typography>.</Typography>
        </Box>
      ),
      recordButton: (
        <Recorder
          recorderIndex={2}
          initialData={cardData.p03.audioData?.[2]}
          readOnly={cardData.p03.isSubmitted}
          onSubmit={() => {
            handleSetComplete(1, true);
            onSubmitRecorder(2);
          }}
          ref={ref => {
            recorderRef.current[2] = ref;
          }}
          onRefresh={() => {
            handleSetComplete(1, false);
          }}
        />
      ),
    },
    {
      type: 'A',
      content: (
        <Box>
          <Typography useGap={false}>Why do you think so?</Typography>
        </Box>
      ),
      recordButton: (
        <SimpleAudioPlayer
          ref={ref => {
            audioRefs.current[2] = ref;
          }}
          audioSrc={'/L04/C03/A03/HE2-L04-C03-A03-01-3.mp3'}
          ariaLabel={'2번 지문 듣기 버튼'}
          onChangeStatus={() => handleAudioReset(2)}
          onEnded={() => handleSetComplete(2, true)}
        />
      ),
    },
    {
      type: 'You',
      content: (
        <Box>
          <Typography useGap={false}>That’s because</Typography>
          <Input
            placeholder='e.g. genetics is helpful in finding and reducing the risks of serious diseases'
            width='632px'
            maxLength={75}
            value={cardData.p03.answer?.[1]}
            onChange={e => handleInputChange(1, e.target.value)}
            inputSize='x-small'
            textAlign='start'
            ariaLabel='2번 답란'
            readOnly={cardData.p03.isSubmitted}
          />
          <Typography>.</Typography>
        </Box>
      ),
      recordButton: (
        <Recorder
          recorderIndex={3}
          initialData={cardData.p03.audioData?.[3]}
          readOnly={cardData.p03.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(3);
            handleSetComplete(3, true);
          }}
          ref={ref => {
            recorderRef.current[3] = ref;
          }}
          onRefresh={() => {
            handleSetComplete(3, false);
          }}
        />
      ),
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'You' : 'A';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'A' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={!(cardData.p03.isRecordDone?.every(value => value) && cardData.p03.answer?.every(isNotEmptyString)) || cardData.p03.isSubmitted}
      submitBtnColor={
        cardData.p03.isSubmitted || !(cardData.p03.isRecordDone?.every(value => value) && cardData.p03.answer?.every(isNotEmptyString))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <List<IListenAndAnswer> data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            <Box height={'80px'}>
              <Label value={value?.type || ''} type={'paint'} background={labelColor(index)} />
            </Box>
            <Box width={'80%'}>
              <div>{value?.content}</div>
            </Box>
            <Box width={'20%'} hAlign='flex-end'>
              {(index == 1 || cardData.p03.isRecordDone?.[index - 2] || cardData.p03.isSubmitted) && value?.recordButton}
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P03;
