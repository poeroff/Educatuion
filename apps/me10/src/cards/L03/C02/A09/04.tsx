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
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A09 } from './store';
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
      {
        subKey: 5,
        type: 'TEXT',
        value: '',
      },
    ],
  },
];

const P04 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L03C02A09);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'talkTogether',
  };

  const questionInfo = {
    text: `여러분의 감정이나 상태를 말하고 도움을 요청하는 대화를 연습해 봅시다.`,
  };

  const handleChangeInput = (value: string, subKey: number) => {
    switch (subKey) {
      case 4:
        setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
        break;
      case 5:
        setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
        break;
    }
    changeData('P04', 1, subKey, value);
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L03/C02/A09/ME1-L03-C02-A09-P04-1.mp3',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
    },
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L03/C02/A09/ME1-L03-C02-A09-P04-2.mp3',
    },
  ];

  const solution: React.ReactNode = (
    <>
      <BlockTypography>A: You don’t look happy. What’s wrong?</BlockTypography>
      <BlockTypography>B: I’m hungry. Can you cook something for me?</BlockTypography>
      <BlockTypography>A: Of course.</BlockTypography>
    </>
  );

  const isEmptyAudioData = (data: IAudioData | null | undefined) => {
    return !data || Object.keys(data).length === 0;
  };

  const isSubmitDisabled =
    !isNotEmptyString(cardData.p04.answer1 || '') ||
    !isNotEmptyString(cardData.p04.answer2 || '') ||
    Object.values(cardData.p04.audioData!).some(isEmptyAudioData) ||
    !cardData.p04.isAudioPlayed?.every(value => value);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L03/C02/A09',
      changeData,
      mainKey: 1,
      page: 'p04',
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
    const newIsAudioPlayed = cardData.p04.isAudioPlayed?.map((v, i) => (i === audioIndex ? true : v));
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isAudioPlayed: newIsAudioPlayed } }));
    changeData('P04', 1, subKey, true);
  };

  const onSubmitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P04')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P04')!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
    submitData('P04', userSubmission);
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
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p04.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[3]?.value || cardData.p04.answer1 || '',
            answer2: userSubmissionList[0].inputData[4]?.value || cardData.p04.answer2 || '',
            isAudioPlayed: [
              userSubmissionList[0].inputData[1]?.value || cardData.p04.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[2]?.value || cardData.p04.isAudioPlayed?.[1] || false,
            ],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={onSubmitAnswer}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      useExtend
    >
      <Box hAlign='center'>
        <Box>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[0].type} type={'paint'} background={data[0].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>You don’t look happy. What’s wrong?</Typography>
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
                I’m{' '}
                <Input
                  width='374px'
                  placeholder='내용을 넣어 주세요.'
                  value={cardData.p04.answer1}
                  onChange={e => handleChangeInput(e.target.value, 4)}
                  readOnly={cardData.p04.isSubmitted}
                  ariaLabel='B의 대사 첫번째 빈칸'
                  maxLength={100}
                />
                .
              </BlockTypography>
              <BlockTypography usePre>
                Can you{' '}
                <Input
                  width='374px'
                  placeholder='내용을 넣어 주세요.'
                  value={cardData.p04.answer2}
                  onChange={e => handleChangeInput(e.target.value, 5)}
                  readOnly={cardData.p04.isSubmitted}
                  ariaLabel='B의 대사 두번째 빈칸'
                  maxLength={100}
                />
                ?
              </BlockTypography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={!cardData.p04.isAudioPlayed?.[0]}>
                <Recorder
                  recorderIndex={1}
                  initialData={cardData.p04.audioData?.[1]}
                  readOnly={cardData.p04.isSubmitted}
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
              <Typography usePre>Of course.</Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={isEmptyAudioData(cardData.p04.audioData?.[1]) || !cardData.p04.isAudioPlayed?.[0]}>
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
            <Tag type={ETagLine.GREEN} label={'모범답안'} />
          </Box>
          <Box marginTop='12px'>{solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;

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
