import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioData,
  IQuestionProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Image,
  PinchZoom,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Tag,
  TextView,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C01A02 } from './store';

const headerText = 'Warm Up';
const questionText = '그림을 보고, 예시를 참고하여 어떤 환경 보호 활동을 하고 있는지 말해 봅시다.';
const answer = `Seri is making art out of trash.`;
const example = ['Seri is making art out of trash.'];
const audioSrc = '/L05/C01/A02/ME1-L05-C01-A02-P01.mp3';
const imageSrc = '/L05/C01/A02/ME1-L05-C01-A02-P01.jpg';
const alt =
  '바닷가를 배경으로 해변에서 분리수거를 하고 있는 Alice라는 이름의 여학생, 바다에 떠 있는 쓰레기를 모으는 Daniel이라는 남학생, 해변의 쓰레기를 줍는 Jimin이라는 남학생, 쓰레기를 모아 해변에 미술 작품을 만들고 있는 Seri라는 여학생이 있는 모습';

const page = 'P01';
const pageKey = 'p01';
const cardPath = 'L05/C01/A02';
const subKey = 1;
const subjectCode = 'ME10';
const audioRefIndex = 0;

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };

  const questionInfo: IQuestionProps = {
    text: questionText,
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: subKey,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L05C01A02);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { audioData, isSubmitted } = cardData.p01;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = !Object.values(audioData!).every(value => value && Object.keys(value).length > 0);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '완료하기'), [isSubmitted, isAnswerShow]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitRecorder = async (subkey: number) => {
    recorderRef.current?.[subKey]?.onSubmitRecorderProcess({
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: subkey,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const userSubmission: userSubmissionType[] = [{ mainKey: 1, inputData: [] }];

      if (pageData.find(value => value.page === page)) {
        userSubmission[0].inputData = pageData.find(value => value.page === page)!.userSubmission[0].inputData;
      }

      handleAudioReset(audioRefIndex, false);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      submitData(page, userSubmission);
    }
  };

  const handleAudioReset = (index: number, status: boolean) => {
    audioRefs.current[index]?.changePlayStatus(status);
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
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      submitDisabled={isDisabled}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={onSubmitAnswer}
    >
      <BoxWrap>
        <Box>
          <PinchZoom>
            <Image src={imageSrc} width='530px' height='340px' ariaDescribedby='img_desc' />
            <Box id='img_desc' type='hidden'>
              {alt}
            </Box>
          </PinchZoom>
        </Box>
        <Box>
          <TextView title='예시' height='238px'>
            <Typography align='left'>
              {example.map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
            <Box marginTop='20px'>
              <SimpleAudioPlayer
                ref={ref => (audioRefs.current[audioRefIndex] = ref)}
                audioSrc={audioSrc}
                ariaLabel={'지문 듣기'}
                onChangeStatus={status => handleAudioReset(audioRefIndex, status)}
              />
            </Box>
          </TextView>
          <Box hAlign='center' padding='24px' marginTop='10px'>
            <Recorder
              recorderIndex={subKey}
              initialData={audioData?.[subKey]}
              readOnly={isSubmitted}
              onSubmit={() => {
                onSubmitRecorder(subKey);
              }}
              onClick={() => {
                handleRecorderClose(subKey);
                handleAudioReset(audioRefIndex, false);
              }}
              ref={ref => {
                recorderRef.current[subKey] = ref;
              }}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='예시 답안' />
          <Box marginTop='12px'>
            <Typography usePre>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
