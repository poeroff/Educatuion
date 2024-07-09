import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioData,
  Input,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Label,
  Recorder,
  SimpleAudioPlayer,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C02A09 } from './store';
import { studentAtom } from '@/stores/student';
import React, { useEffect, useRef, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  labelColor: string;
  audioSrc?: string;
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
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 3,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 4,
        type: 'TEXT',
        value: '',
      },
    ],
  },
];

const P03 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L05C02A09);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'talkTogether',
  };

  const questionInfo = {
    text: `B가 되어 주말 계획에 대해 묻고 답하는 대사를 완성한 후, 대화를 연습해 봅시다.`,
  };
  
  const handleChangeInput = (value: string, subKey: number) => {
    switch (subKey) {
      case 4:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
        break;
    }
    changeData('P03', 1, subKey, value);
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L05/C02/A09/ME1-L05-C02-A09-P03-1.mp3',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
    },
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L05/C02/A09/ME1-L05-C02-A09-P03-2.mp3',
    },
  ];

  const solution: React.ReactNode = (
    <>
      <BlockTypography>A: What are you going to do this weekend?</BlockTypography>
      <BlockTypography>B: I’m going to watch moives. Why don’t you join me?</BlockTypography>
      <BlockTypography>A: Sure. That sounds great!</BlockTypography>
    </>
  );

  const isEmptyAudioData = (data: IAudioData | null | undefined) => {
    return !data || Object.keys(data).length === 0;
  };

  const isSubmitDisabled =
    !isNotEmptyString(cardData.p03.answer || '') ||
    Object.values(cardData.p03.audioData!).some(isEmptyAudioData) ||
    !cardData.p03.isAudioPlayed?.every(value => value);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L05/C02/A09',
      changeData,
      mainKey: 1,
      page: 'p03',
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

  const handleAudioReset = (subKey: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== subKey && ref?.changePlayStatus(false);
    });
  };

  const handleAudioEnded = (subKey: number) => {
    const audioIndex = subKey - 2;
    const newIsAudioPlayed = cardData.p03.isAudioPlayed?.map((v, i) => (i === audioIndex ? true : v));
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isAudioPlayed: newIsAudioPlayed } }));
    changeData('P03', 1, subKey, true);
  };

  const onSubmitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    }
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
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    submitData('P03', userSubmission);
  };

  const makeAudioData = async ({
    originCardData,
    userSubmissionList,
  }: {
    originCardData:
      | {
          [x: string]: IAudioData | null;
        }
      | undefined;
    userSubmissionList: userSubmissionType<IUploadRecordData>[];
  }) => {
    const newCardData: typeof originCardData = originCardData ? { ...originCardData } : {};

    for (let index = 0; index < userSubmissionList[0].inputData.length; index++) {
      const data = userSubmissionList[0].inputData[index];

      if (!data.value) continue;
      if (data.type !== 'AUDIO') continue;

      let result: string | Blob = 'TIMEOUT';

      if (data.value.uploadPath) {
        result = await fulfillWithTimeLimit(1000, 3, handleDownload(subjectCode, data.value.uploadPath));

        if (result !== 'TIMEOUT') {
          newCardData[data.subKey] = {
            blob: [result as Blob],
            convertedText: data.value.convertedText,
            recordingTime: data.value.recordingTime,
            totalAudioVolumes: data.value.totalAudioVolumn,
          };
        }
      }
    }

    return newCardData;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer || '',
            isAudioPlayed: [
              userSubmissionList[0].inputData[1]?.value || cardData.p03.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[2]?.value || cardData.p03.isAudioPlayed?.[1] || false,
            ],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={onSubmitAnswer}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='center'>
        <Box>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[0].type} type={'paint'} background={data[0].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <BlockTypography usePre>What are you going to do this weekend?</BlockTypography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <SimpleAudioPlayer
                ref={ref => {
                  audioRefs.current[2] = ref;
                }}
                audioSrc={data[0]?.audioSrc ?? ''}
                ariaLabel={`A의 1번 지문 듣기`}
                onChangeStatus={() => handleAudioReset(2)}
                onEnded={() => handleAudioEnded(2)}
              />
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px' marginTop='10px'>
              <Label value={data[1].type} type={'paint'} background={data[1].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <BlockTypography usePre>
                I’m going to{' '}
                <Input
                  width='340px'
                  placeholder='내용을 넣어 주세요.'
                  value={cardData.p03.answer}
                  onChange={e => handleChangeInput(e.target.value, 4)}
                  readOnly={cardData.p03.isSubmitted}
                  ariaLabel='B의 대사 빈칸'
                  maxLength={100}
                />
                .
              </BlockTypography>
              <BlockTypography usePre>Why don’t you join me?</BlockTypography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={!cardData.p03.isAudioPlayed?.[0]}>
                <Recorder
                  recorderIndex={1}
                  initialData={cardData.p03.audioData?.[1]}
                  readOnly={cardData.p03.isSubmitted}
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
              </HiddenDiv>
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px' marginTop='4px'>
              <Label value={data[2].type} type={'paint'} background={data[2].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>Sure. That sounds great!</Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={isEmptyAudioData(cardData.p03.audioData?.[1]) || !cardData.p03.isAudioPlayed?.[0]}>
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[3] = ref;
                  }}
                  audioSrc={data[2]?.audioSrc ?? ''}
                  ariaLabel={`A의 2번 지문 듣기`}
                  onChangeStatus={() => handleAudioReset(3)}
                  onEnded={() => handleAudioEnded(3)}
                />
              </HiddenDiv>
            </Box>
          </BoxWrap>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시답안'} />
          </Box>
          <Box marginTop='12px'>{solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const HiddenDiv = styled.div<{ isHidden: boolean }>(props => ({
  visibility: props.isHidden ? 'hidden' : 'visible',
  width: props.isHidden ? 0 : '',
  height: props.isHidden ? 0 : '',
  overflow: props.isHidden ? 'hidden' : 'auto',
  transform: props.isHidden ? 'scale(0)' : '',
}));

const BlockTypography = styled(Typography)({
  display: 'block',
});
