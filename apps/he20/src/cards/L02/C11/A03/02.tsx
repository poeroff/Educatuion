import usePageData from '@/hooks/usePageData';
import styled from '@emotion/styled';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Typography,
  RecordButton,
  EStyleFontSizes,
  Recorder,
  SimpleAudioPlayer,
  EStyleButtonTypes,
  ISimpleAudioPlayerRef,
  OverlayTooltip,
  IRecorderRef,
  IAudioData,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container, PlayButton } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A03 } from './store';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
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
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 4,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 5,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 6,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 7,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 8,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 9,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 10,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 11,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 12,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 13,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 14,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 15,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 16,
        type: 'BOOLEAN',
        value: false,
      },
    ],
  },
];

const audioSubKeys = [1, 2, 3, 4, 5, 6, 7, 8];

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
  };

  const questionInfo = {
    text: '2. Choosing your role, practice the dialogue.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <span>Hey, Chris. Do you have any plans this weekend?</span>,
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-01.mp3',
    },
    {
      type: 'B',
      content: <span>Not really. Why, what’s up?</span>,
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-02.mp3',
    },
    {
      type: 'A',
      content: (
        <>
          <BoldSpan> Jessica and I are going to watch a movie. </BoldSpan>
          <span>Would you like to join us?</span>
        </>
      ),
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-03.mp3',
    },
    {
      type: 'B',
      content: <span>I’d love to. I know that Space War 3 is on at the theater now. How about watching that?</span>,
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-04.mp3',
    },
    {
      type: 'A',
      content: (
        <>
          <span>Oh, we were thinking of watching a movie at my place.</span>
        </>
      ),
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-05.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <span>Really? I rarely watch movies at home. </span>
          <BoldSpan>Don’t you think watching movies at the theater is more engaging than watching them at home?</BoldSpan>
        </>
      ),
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-06.mp3',
    },
    {
      type: 'A',
      content: (
        <>
          <span>I see your point. </span>
          <BoldSpan>Why don’t we think about it and decide after checking with Jessica?</BoldSpan>
        </>
      ),
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-07.mp3',
    },
    {
      type: 'B',
      content: (
        <>
          <span>All right. If we all agree, let’s go to the movies together.</span>
        </>
      ),
      audioSrc: '/L02/C11/A03/HE2-L02-C11-A03-P02-08.mp3',
    },
  ];

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [role, setRole] = useState<string>();
  const [isStop, setIsStop] = useState(true);

  const step: { [key: string]: number } = useMemo(() => {
    let stepA = 0;
    let stepB = 0;
    for (let i = 0; i < audioSubKeys.length; i++) {
      const subkey = audioSubKeys[i];
      if (i % 2 === 0) {
        stepA += cardData.P02.audioData?.[subkey] ? 1 : 0;
        stepB += cardData.P02.isAudioPlayed?.[i] ? 1 : 0;
      } else {
        stepB += cardData.P02.audioData?.[subkey] ? 1 : 0;
        stepA += cardData.P02.isAudioPlayed?.[i] ? 1 : 0;
      }
    }
    return { A: stepA, B: stepB };
  }, [cardData.P02]);

  const isRoleFinished = (role: string | undefined) => {
    if (role === 'A') {
      const isAllRecordADone = audioSubKeys.every(subkey => (subkey % 2 === 1 ? !!cardData.P02.audioData?.[subkey] : true));
      const isAllAudioBDone = cardData.P02.isAudioPlayed?.every((value, index) => (index % 2 === 0 ? true : value));
      return isAllRecordADone && isAllAudioBDone;
    } else if (role === 'B') {
      const isAllRecordBDone = audioSubKeys.every(subkey => (subkey % 2 === 0 ? !!cardData.P02.audioData?.[subkey] : true));
      const isAllAudioADone = cardData.P02.isAudioPlayed?.every((value, index) => (index % 2 === 1 ? true : value));
      return isAllRecordBDone && isAllAudioADone;
    } else {
      return false;
    }
  };

  const isSubmitDisabled = cardData.P02.isSubmitted || !isRoleFinished(role);

  const isShowRecordAudio = (value: IListenAndAnswer | undefined, index: number) => {
    const isMyRole = value?.type === role;
    const isDone = !!role && index - 1 < step[role];
    const isInProgress = !!role && index - 1 === step[role];
    const isNotStarted = isStop && (!role || step[role] === 0);

    if (isNotStarted) {
      return { audio: false, recorder: false };
    }

    return { audio: !isMyRole && (isDone || isInProgress) && !cardData.P02.isSubmitted, recorder: isMyRole && (isDone || (isInProgress && !isStop)) };
  };

  const stopAllAudio = () => {
    audioRefs.current.forEach(ref => ref?.changePlayStatus(false));
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L02/C11/A03',
      changeData,
      mainKey: 1,
      page: 'P02',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });

    if (index < 8 && !isRoleFinished(role) && !cardData.P02.isSubmitted) {
      audioRefs.current[index + 1]?.changePlayStatus(true);
    }
  };

  const handleAudioEnded = (subKey: number) => {
    const newIsAudioPlayed = (cardData.P02.isAudioPlayed || []).map((v, i) => (i === subKey - 9 ? true : v));
    setCardData(prev => ({
      ...prev,
      P02: { ...prev.P02, isAudioPlayed: newIsAudioPlayed },
    }));
    changeData('P02', 1, subKey, true);
  };

  const handleSubmit = () => {
    if (cardData.P02.isSubmitted) {
      return;
    } else {
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];

      if (pageData.find(value => value.page === 'P02')) {
        userSubmission[0].inputData = pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData;
      }

      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true } }));
      submitData('P02', userSubmission);
      setIsStop(true);
    }
  };

  const handleClickRecordBtn = () => {
    if (isStop) {
      if (!role) return;
    } else {
      stopAllAudio();
    }
    setIsStop(!isStop);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.P02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            isSubmitted,
            audioData: newAudioData,
            isAudioPlayed: [
              userSubmissionList[0].inputData[8].value || cardData.P02.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[9].value || cardData.P02.isAudioPlayed?.[1] || false,
              userSubmissionList[0].inputData[10].value || cardData.P02.isAudioPlayed?.[2] || false,
              userSubmissionList[0].inputData[11].value || cardData.P02.isAudioPlayed?.[3] || false,
              userSubmissionList[0].inputData[12].value || cardData.P02.isAudioPlayed?.[4] || false,
              userSubmissionList[0].inputData[13].value || cardData.P02.isAudioPlayed?.[5] || false,
              userSubmissionList[0].inputData[14].value || cardData.P02.isAudioPlayed?.[6] || false,
              userSubmissionList[0].inputData[15].value || cardData.P02.isAudioPlayed?.[7] || false,
            ],
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      useExtend
    >
      <Box hAlign={'center'} marginBottom={8} justifyContent='space-between'>
        <>
          <Box whiteSpace={'nowrap'}>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나의 역할 선택하기 </Typography>
          </Box>
          <BoxWrap boxGap={8} marginLeft={8}>
            <Box>
              <PlayButton
                label='A'
                color='skyblue'
                isActive={'A' === role}
                onClick={() => {
                  if (!isStop && !!role && role !== 'A' && !isRoleFinished(role)) return;
                  if (role != 'A') setIsStop(true);
                  stopAllAudio();
                  setRole('A');
                }}
                disabled={!isStop && !!role && role !== 'A' && !isRoleFinished(role)}
              />
            </Box>
            <Box>
              <PlayButton
                label='B'
                color='beige'
                isActive={'B' === role}
                onClick={() => {
                  if (!isStop && !!role && role !== 'B' && !isRoleFinished(role)) return;
                  if (role != 'B') setIsStop(true);
                  stopAllAudio();
                  setRole('B');
                }}
                disabled={!isStop && !!role && role !== 'B' && !isRoleFinished(role)}
              />
            </Box>
          </BoxWrap>
        </>
        {!isRoleFinished(role) && !cardData.P02.isSubmitted && (
          <>
            <RecordButton label={!role || isStop ? 'start' : 'stop'} onClick={handleClickRecordBtn} data-tooltip-id='click_tooltip' />
            {!role && (
              <OverlayTooltip
                id='click_tooltip'
                type='normal'
                padding='16px'
                openOnClick
                backgroundColor='var(--color-white)'
                color='var(--color-black)'
                isShadow
              >
                <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
                  역할을 선택하세요.
                </Typography>
              </OverlayTooltip>
            )}
          </>
        )}
      </Box>
      <Box useFull>
        <Scroll maxHeight='340px'>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap minHeight={'44px'}>
                <Box vAlign='center' height={'40px'}>
                  <Label
                    value={index % 2 === 0 ? 'B' : 'A'}
                    type={'paint'}
                    size={'x-small'}
                    background={index % 2 === 0 ? 'var(--color-yellow-100)' : 'var(--color-blue-100)'}
                  />
                </Box>

                <Box width={'70%'}>
                  <div>{value?.content}</div>
                </Box>

                <Box width={'30%'} hAlign='flex-end' vAlign='flex-start'>
                  <HiddenDiv isHidden={!isShowRecordAudio(value, index).audio}>
                    <SimpleAudioPlayer
                      audioSrc={value?.audioSrc ?? ''}
                      onEnded={() => handleAudioEnded(index + 8)}
                      onChangeStatus={() => handleAudioReset(index)}
                      ref={ref => {
                        audioRefs.current[index] = ref;
                      }}
                    />
                  </HiddenDiv>

                  <HiddenDiv isHidden={!isShowRecordAudio(value, index).recorder}>
                    <Recorder
                      recorderIndex={index}
                      readOnly={cardData.P02.isSubmitted}
                      initialData={cardData.P02.audioData?.[index]}
                      onSubmit={() => handleSubmitRecorder(index)}
                      ref={ref => {
                        recorderRef.current[index] = ref;
                      }}
                    />
                  </HiddenDiv>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Scroll>
      </Box>
    </Container>
  );
};
export default P02;

const BoldSpan = styled.span`
  font-weight: var(--font-weight-extraBold);
`;

const HiddenDiv = styled.div<{ isHidden: boolean }>(props => ({
  visibility: props.isHidden ? 'hidden' : 'visible',
  width: props.isHidden ? 0 : '',
  height: props.isHidden ? 0 : '',
  overflow: props.isHidden ? 'hidden' : 'auto',
  transform: props.isHidden ? 'scale(0)' : '',
}));
