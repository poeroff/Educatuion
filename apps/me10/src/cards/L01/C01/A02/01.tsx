import { useEffect, useRef } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Image,
  Typography,
  IQuestionProps,
  BoxWrap,
  PinchZoom,
  TextView,
  EStyleFontSizes,
  SimpleAudioPlayer,
  ISimpleAudioPlayerRef,
  IRecorderRef,
  Recorder,
  EStyleButtonTypes,
  IUploadRecordData,
  IAudioData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L01C01A02 } from './store';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C01A02);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Warm Up',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '그림을 보고, 예시를 참고하여 반 친구들에게 자신을 소개하는 말을 해 봅시다.',
  };

  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

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
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C01/A02',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [{ mainKey: 1, inputData: [] }];

    if (pageData.find(value => value.page === 'P01')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P01')!.userSubmission[0].inputData;
    }

    handleAudioReset(1);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData('P01', userSubmission);
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
      saveData('P01');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={cardData.p01.isSubmitted || !cardData.p01.audioData?.[1]}
      submitBtnColor={
        !cardData.p01.audioData?.[1]
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      vAlign='center'
    >
      <BoxWrap>
        <Box useFull>
          <PinchZoom>
            <Image
              src='/L01/C01/A02/ME1-L01-C01-A02-P01.jpg'
              alt='교실에 농구공을 가지고 있는 남학생과 그 짝꿍, 과자를 먹으며 즐겁게 이야기를 나누고 있는 여학생 3명과 그 짝꿍, 헤드폰을 끼고 음악을 듣고 있는 여학생과 그 짝꿍, 안경을 끼고 책을 읽고 있는 여학생이 앉아 있는 그림과 그 짝꿍'
              width='582px'
              height='340px'
              style={{ borderRadius: '8px' }}
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <TextView title='예시' height='260px' padding='20px 16px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} align='left'>
              Hi, I'm Jiwon.
              <br />
              Nice to meet you.
              <br />
              Do you like basketball?
            </Typography>
            <Box marginTop={20} hAlign='center'>
              <SimpleAudioPlayer
                ref={ref => {
                  audioRefs.current[1] = ref;
                }}
                audioSrc={'/L01/C01/A02/ME1-L01-C01-A02-P01.mp3'}
                ariaLabel={'지문 듣기'}
                onChangeStatus={() => handleAudioReset(1)}
              />
            </Box>
          </TextView>
          <Box hAlign='center' padding={24} marginTop={10}>
            <Recorder
              recorderIndex={1}
              initialData={cardData.p01.audioData?.[1]}
              readOnly={cardData.p01.isSubmitted}
              onSubmit={() => {
                onSubmitRecorder(1);
              }}
              onClick={() => {
                handleRecorderClose(1);
                handleAudioReset(1);
              }}
              ref={ref => {
                recorderRef.current[1] = ref;
              }}
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
