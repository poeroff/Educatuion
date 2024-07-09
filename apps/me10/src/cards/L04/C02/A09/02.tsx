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
  PinchZoom,
  Recorder,
  SimpleAudioPlayer,
  Tag,
  Textarea,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C02A09 } from './store';
import { studentAtom } from '@/stores/student';
import React, { useEffect, useRef, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
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

  const [cardData, setCardData] = useRecoilState(L04C02A09);
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
    src: '/L04/C02/A09/ME1-L04-C02-A09-P01.jpg',
    alt: (
      <Typography>
        쇼핑몰, 에스컬레이터를 중심으로 1층의 왼쪽에는 왼쪽부터 순서대로 Plant Shop, Music Shop이 있고 오른쪽에는 왼쪽부터 순서대로 Bag Store, Clothes
        Shop, Candy Shop이 나란히 있다. 2층의 왼쪽에는 왼쪽부터 순서대로 Hat Store, Restrooms가 있고 오른쪽에는 왼쪽부터 순서대로 Sports Store,
        Bookstore, Blue Cafe가 나란히 있다.
      </Typography>
    ),
    exp: (
      <Typography align='left' fontSize='24px' lineHeight='36px'>
        <Typography>first floor</Typography>
        <Typography>next to</Typography>
        <Typography>second floor</Typography>
        <Typography>between ~ and ...</Typography>
      </Typography>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: 'Look! There are so many new places.',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L04/C02/A09/ME1-L04-C02-A09-P02-1.mp3',
    },
    {
      type: 'B',
      content: 'Wow, I’m so excited! Let’s go to Blue Cafe.',
      labelColor: 'var(--color-orange-200)',
    },
    {
      type: 'A',
      content: 'Okay. How can we get there?',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L04/C02/A09/ME1-L04-C02-A09-P02-2.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <BlockTypography useGap={false}>Go to the second floor and turn right. </BlockTypography>
          <BlockTypography useGap={false}>It’s next to the bookstore.</BlockTypography>
        </>
      ),
      labelColor: 'var(--color-orange-200)',
    },
  ];

  const solution: React.ReactNode = (
    <>
      <BlockTypography>A: Look! There are so many new places.</BlockTypography>
      <BlockTypography>B: Wow, I’m so excited! Let’s go to the hat store.</BlockTypography>
      <BlockTypography>A: Okay. How can we get there?</BlockTypography>
      <BlockTypography>B: We have to go to the second floor and turn left. It's next to the restrooms.</BlockTypography>
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
      cardPath: 'L04/C02/A09',
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
      useExtend
    >
      <Box hAlign='center'>
        <Box marginRight='24px' padding='10px'>
          <PinchZoom>
            <Image src={imageInfo.src} ariaDescribedby='img_desc' width='300px' style={{ alignSelf: 'center' }} />
          </PinchZoom>
          <Box type='hidden' id='img_desc'>
            {imageInfo.alt}
          </Box>
          <TextView title='표현' padding='20px 16px'>
            <Box width='300px' alignItems='justify'>
              {imageInfo.exp}
            </Box>
          </TextView>
        </Box>
        <Box>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[0].type} type={'paint'} background={data[0].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>Look! There are so many new places.</Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <SimpleAudioPlayer
                ref={ref => {
                  audioRefs.current[3] = ref;
                }}
                audioSrc={data[0]?.audioSrc ?? ''}
                ariaLabel={`A의 첫번째 지문 듣기`}
                onChangeStatus={() => handleAudioReset(3)}
                onEnded={() => handleAudioEnded(3)}
              />
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[1].type} type={'paint'} background={data[1].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>
                Wow, I’m so excited!{'\n'}Let’s go to{' '}
                <Input
                  width='250px'
                  placeholder='내용을 넣어 주세요'
                  value={cardData.p02.answer1}
                  onChange={e => handleChangeInput(e.target.value, 5)}
                  readOnly={cardData.p02.isSubmitted}
                  ariaLabel='B의 첫번째 대사 빈칸'
                  maxLength={30}
                />
                .
              </Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={!cardData.p02.isAudioPlayed?.[0]}>
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
              </HiddenDiv>
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px' marginTop='8px'>
              <Label value={data[2].type} type={'paint'} background={data[2].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>Okay. How can we get there?</Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv isHidden={!cardData.p02.isAudioPlayed?.[0] || isEmptyAudioData(cardData.p02.audioData?.[1])}>
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[4] = ref;
                  }}
                  audioSrc={data[2]?.audioSrc ?? ''}
                  ariaLabel={`B의 두번째 지문 듣기`}
                  onChangeStatus={() => handleAudioReset(4)}
                  onEnded={() => handleAudioEnded(4)}
                />
              </HiddenDiv>
            </Box>
          </BoxWrap>
          <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
            <Box marginRight='8px'>
              <Label value={data[3].type} type={'paint'} background={data[3].labelColor} />
            </Box>
            <Box width={'80%'} whiteSpace='nowrap'>
              <Typography usePre>
                <Textarea
                  placeholder='내용을 넣어 주세요'
                  value={cardData.p02.answer2}
                  onChange={e => handleChangeInput(e.target.value, 6)}
                  readOnly={cardData.p02.isSubmitted}
                  ariaLabel='B의 두번째 대사 빈칸'
                  width='400px'
                  height='94px'
                ></Textarea>
              </Typography>
            </Box>
            <Box width={'20%'} hAlign='flex-end' vAlign='flex-start' minWidth='131px'>
              <HiddenDiv
                isHidden={!cardData.p02.isAudioPlayed?.[0] || isEmptyAudioData(cardData.p02.audioData?.[1]) || !cardData.p02.isAudioPlayed?.[1]}
              >
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
