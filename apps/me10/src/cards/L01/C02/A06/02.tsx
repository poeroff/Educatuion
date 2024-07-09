import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IAudioData,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Input,
  Label,
  List,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A06 } from './store';

interface IListenAndAnswer {
  type: string;
  color: string;
  content: React.ReactNode;
  recordButton: React.ReactNode;
  audioSrc?: string;
}

const P02 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L01C02A06);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageNo = 'P02';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meSmallTalk',
    headerText: 'B',
  };

  const questionInfo = {
    text: 'A가 되어 대사를 완성한 후, 대화를 연습해 봅시다.',
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
      ],
    },
  ];

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const onSubmitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

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
    submitData(pageNo, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C02/A06',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isSubmitted,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            audioData: newAudioData,
            isRecordDone: isSubmitted ? Array<boolean>(3).fill(true) : prev.p02.isRecordDone,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
    changeData(pageNo, 1, 1, e.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const checkDisableInput = () => {
    return (
      !cardData.p02.answer1 ||
      !isNotEmptyString(cardData.p02.answer1 as string) ||
      Object.values(cardData.p02.audioData!).length !== 1 ||
      !cardData.p02.isRecordDone?.every(val => val) ||
      cardData.p02.isSubmitted
    );
  };

  const handleSetComplete = (index: number, value: boolean) => {
    const updatedRecords = cardData.p02.isRecordDone?.map((val, idx) => (idx === index ? value : val));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        isRecordDone: updatedRecords,
      },
    }));
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <>
          <Typography useGap={false}>I like</Typography>{' '}
          <Input
            placeholder='내용을 넣어 주세요.'
            width='300px'
            maxLength={50}
            value={cardData.p02.answer1}
            onChange={handleInputChange}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='답 입력란'
          />
          {'.'}
          <br />
          <Typography useGap={false}>How about you?</Typography>
        </>
      ),
      recordButton: (
        <Recorder
          recorderIndex={2}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
            handleSetComplete(1, true);
          }}
          onClick={() => {
            handleRecorderClose(2);
            handleAudioReset(0);
          }}
          ref={ref => {
            recorderRef.current[2] = ref;
          }}
          readOnly={cardData.p02.isSubmitted}
        />
      ),
    },
    {
      type: 'B',
      color: 'var(--color-red-300)',
      content: <Typography useGap={false}>I like flowers.</Typography>,
      recordButton: !cardData.p02.isSubmitted && (
        <SimpleAudioPlayer
          audioSrc={'/L01/C02/A06/ME1-L01-C02-A06-P02.mp3'}
          ariaLabel={'듣기 버튼'}
          onChangeStatus={() => handleAudioReset(0)}
          onEnded={() => handleSetComplete(2, true)}
        />
      ),
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={checkDisableInput()}
      onSubmit={onSubmitAnswer}
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
              {cardData.p02.isRecordDone?.[index - 1] && value?.recordButton}
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P02;
