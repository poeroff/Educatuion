import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Image,
  Textarea,
  Recorder,
  IRecorderRef,
  IUploadRecordData,
  IAudioData,
  EStyleButtonTypes,
  ISimpleAudioPlayerRef,
  PinchZoom,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';
import { L01C11A02HeaderInfo, L01C11A02ImageInfo, L01C11A02QuestionInfo } from './store';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C11A02 } from './store';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

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

const P03 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A02);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P03')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P03')!.userSubmission[0].inputData;
    }

    handleAudioReset(2);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    submitData('P03', userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C11/A02',
      changeData,
      mainKey: 1,
      page: 'p03',
      subjectCode: subjectCode,
      subKey: index,
      userId,
      setFunction: setCardData,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
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
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: event.target.value } }));
    changeData('P03', 1, 1, event.target.value);
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
      saveData('P03');
    };
  }, []);

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  return (
    <Container
      headerInfo={L01C11A02HeaderInfo}
      questionInfo={L01C11A02QuestionInfo.p03}
      submitLabel='완료하기'
      submitBtnColor={
        cardData.p03.answer === '' ||
        cardData.p03.isSubmitted ||
        !Object.values(cardData.p03.audioData!).every(value => {
          return value && Object.keys(value).length > 0;
        })
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={
        cardData.p03.answer === '' ||
        cardData.p03.isSubmitted ||
        !Object.values(cardData.p03.audioData!).every(value => {
          return value && Object.keys(value).length > 0;
        })
      }
      onSubmit={onSubmitAnswer}
      vAlign='flex-start'
    >
      <Box vAlign='center'>
        <Box marginRight={12}>
          <PinchZoom>
            <Image src={L01C11A02ImageInfo.p03.src} alt={L01C11A02ImageInfo.p03.alt} width='auto' height='150px' />
          </PinchZoom>
        </Box>
        <Box marginRight={8}>
          <Balloon place='left' backgroundColor='var(--color-white)' isShadow>
            <Typography usePre>
              The name of our dream school is Hogwarts.{'\n'}Classes start at 10. We have six lessons a{'\n'}day. They’re all about magic. We wear all
              {'\n'}black, like magicians!
            </Typography>
          </Balloon>
        </Box>
      </Box>
      <Box vAlign='center' hAlign='center' marginTop={5} marginRight={20} width='930px'>
        <Box width={'640px'} padding={'12px 24px'} borderRadius={40}>
          <Textarea
            value={cardData.p03.answer}
            onChange={handleTextChange}
            border-radius='24px'
            width='100%'
            height='200px'
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답 입력란'
            readOnly={cardData.p03.isSubmitted}
          />
        </Box>
        <Box position='absolute' right={50} bottom={12}>
          <Recorder
            recorderIndex={2}
            initialData={cardData.p03.audioData?.[2]}
            readOnly={cardData.p03.isSubmitted}
            onSubmit={() => {
              onSubmitRecorder(2);
            }}
            onClick={() => {
              handleRecorderClose(2);
              handleAudioReset(2);
            }}
            ref={ref => {
              recorderRef.current[2] = ref;
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P03;
