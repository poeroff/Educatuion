import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioData,
  Image,
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
import { L02C02A09 } from './store';
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
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 3,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 4,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 5,
        type: 'TEXT',
        value: '',
      },
      {
        subKey: 6,
        type: 'TEXT',
        value: '',
      },
    ],
  },
];

const P02 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L02C02A09);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'talkTogether',
  };

  const questionInfo = {
    text: `그림을 보고 주어진 표현을 활용하여 대사를 완성한 후, 대화를 연습해 봅시다.`,
  };

  const handleChangeInput = (value: string, subKey: number) => {
    switch (subKey) {
      case 5:
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
        break;
      case 6:
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
        break;
    }
    changeData('P02', 1, subKey, value);
  };

  const imageInfo = {
    src: '/L02/C02/A09/ME1-L02-C02-A09-P02.jpg',
    alt: 'London에 있는 Harry가 비오는 날에 축구하고 있는 사진',
    exp: 'play soccer',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
      audioSrc: '/L02/C02/A09/ME1-L02-C02-A09-P02-1.mp3',
    },
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
      audioSrc: '/L02/C02/A09/ME1-L02-C02-A09-P02-2.mp3',
    },
  ];

  const solution: React.ReactNode = (
    <>
      <BlockTypography>A: What’s the weather like in London?</BlockTypography>
      <BlockTypography>B: It’s rainy.</BlockTypography>
      <BlockTypography>A: What is Harry doing?</BlockTypography>
      <BlockTypography> B: He’s playing soccer.</BlockTypography>
    </>
  );

  const isEmptyAudioData = (data: IAudioData | null | undefined) => {
    return !data || Object.keys(data).length === 0;
  };

  const isSubmitDisabled =
    !isNotEmptyString(cardData.p02.answer1 || '') ||
    !isNotEmptyString(cardData.p02.answer2 || '') ||
    Object.values(cardData.p02.audioData!).some(isEmptyAudioData) ||
    !cardData.p02.isAudioPlayed?.every(value => value);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L02/C02/A09',
      changeData,
      mainKey: 1,
      page: 'p02',
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
    const audioIndex = subKey - 3;
    const newIsAudioPlayed = cardData.p02.isAudioPlayed?.map((v, i) => (i === audioIndex ? true : v));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isAudioPlayed: newIsAudioPlayed } }));
    changeData('P02', 1, subKey, true);
  };

  const onSubmitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    submitData('P02', userSubmission);
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
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[4]?.value || cardData.p02.answer1 || '',
            answer2: userSubmissionList[0].inputData[5]?.value || cardData.p02.answer2 || '',
            isAudioPlayed: [
              userSubmissionList[0].inputData[2]?.value || cardData.p02.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[3]?.value || cardData.p02.isAudioPlayed?.[1] || false,
            ],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={onSubmitAnswer}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='center'>
        <Box marginRight='24px' padding='10px' textAlign='center' width='280px'>
          <Image src={imageInfo.src} alt={imageInfo.alt} width='inherit' />
          <TextView title='표현' padding='20px 8px'>
            <Typography fontSize='24px'>{imageInfo.exp}</Typography>
          </TextView>
        </Box>
        <Box>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[0].type} type={'paint'} background={data[0].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>
                What’s the weather like in
                <Input
                  width='180px'
                  placeholder=''
                  value={cardData.p02.answer1}
                  onChange={e => handleChangeInput(e.target.value, 5)}
                  readOnly={cardData.p02.isSubmitted}
                  ariaLabel='A의 1번째 대사 빈칸'
                />
                ?
              </Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <Recorder
                recorderIndex={1}
                initialData={cardData.p02.audioData?.[1]}
                readOnly={cardData.p02.isSubmitted}
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
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[1].type} type={'paint'} background={data[1].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>It’s rainy.</Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={isEmptyAudioData(cardData.p02.audioData?.[1])}>
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[3] = ref;
                  }}
                  audioSrc={data[1]?.audioSrc ?? ''}
                  ariaLabel={`B의 1번 지문 듣기`}
                  onChangeStatus={() => handleAudioReset(3)}
                  onEnded={() => handleAudioEnded(3)}
                />
              </HiddenDiv>
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px' marginTop='8px'>
              <Label value={data[2].type} type={'paint'} background={data[2].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>
                What is{' '}
                <Input
                  width='180px'
                  placeholder=''
                  value={cardData.p02.answer2}
                  onChange={e => handleChangeInput(e.target.value, 6)}
                  readOnly={cardData.p02.isSubmitted}
                  ariaLabel='A의 2번째 대사 빈칸'
                />{' '}
                doing?
              </Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px' marginTop='8px'>
              <HiddenDiv isHidden={isEmptyAudioData(cardData.p02.audioData?.[1]) || !cardData.p02.isAudioPlayed?.[0]}>
                <Recorder
                  recorderIndex={2}
                  initialData={cardData.p02.audioData?.[2]}
                  readOnly={cardData.p02.isSubmitted}
                  onSubmit={() => {
                    onSubmitRecorder(2);
                  }}
                  onClick={() => {
                    handleRecorderClose(2);
                    handleAudioReset(0);
                  }}
                  ref={ref => {
                    recorderRef.current[2] = ref;
                  }}
                />
              </HiddenDiv>
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[3].type} type={'paint'} background={data[3].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography>He’s playing soccer.</Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv
                isHidden={
                  isEmptyAudioData(cardData.p02.audioData?.[1]) || !cardData.p02.isAudioPlayed?.[0] || isEmptyAudioData(cardData.p02.audioData?.[2])
                }
              >
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[4] = ref;
                  }}
                  audioSrc={data[3]?.audioSrc ?? ''}
                  ariaLabel={`B의 2번 지문 듣기`}
                  onChangeStatus={() => handleAudioReset(4)}
                  onEnded={() => handleAudioEnded(4)}
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

export default P02;

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
