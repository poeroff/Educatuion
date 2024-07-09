import {
  Box,
  EStyleButtonTypes,
  ESvgType,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Label,
  Recorder,
  SimpleAudioPlayer,
  SvgIcon,
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
import { L02C02A07 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import arrow_down from '@/assets/icon/teenyicons_arrow_solid_down.svg';

const P01 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L02C02A07);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageNo = 'P01';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'sounds',
  };

  const questionInfo = {
    text: '억양에 유의하여 잘 듣고, 따라 말해 봅시다.',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: subjectCode,
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
      cardPath: 'L02/C02/A07',
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
    return Object.values(cardData.p01.audioData!).length !== 1 || !cardData.p01.isRecordDone?.every(val => val) || cardData.p01.isSubmitted;
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
      <Box hAlign='center' marginBottom={24}>
        <Label background='var(--color-blue-100)' shape='square' value={1} marginRight={10} />
        <Typography lineHeight='42px'>What’s the weather like today?</Typography>
        <Box width={4} />
        <SvgIcon type={ESvgType.IMG} src={arrow_down} size='32px' alt='아래로 향하는 화살표' />
      </Box>
      <Box hAlign='center' marginTop='32px'>
        <SimpleAudioPlayer
          ref={ref => {
            audioRefs.current[1] = ref;
          }}
          audioSrc={'/L02/C02/A07/ME1-L02-C02-A07-P01.mp3'}
          ariaLabel={'대화 듣기 버튼'}
          onChangeStatus={() => handleAudioReset(1)}
        />
        <Box width={8} />
        <Recorder
          recorderIndex={1}
          initialData={cardData.p01.audioData?.[1]}
          readOnly={cardData.p01.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(1);
          }}
          onClick={() => {
            handleRecorderClose(1);
            handleAudioReset(0);
          }}
          ref={ref => {
            recorderRef.current[1] = ref;
          }}
        />
      </Box>
    </Container>
  );
};

export default P01;
