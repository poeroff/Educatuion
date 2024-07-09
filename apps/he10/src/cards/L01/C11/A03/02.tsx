import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Label,
  Typography,
  RecordButton,
  EStyleFontSizes,
  Recorder,
  SimpleAudioPlayer,
  ISimpleAudioPlayerRef,
  Button,
  EStyleButtonTypes,
  OverlayTooltip,
  IRecorderRef,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C11A03 } from './store';
import usePageData from '@/hooks/usePageData';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  audioSrc: string;
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
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 8,
        type: 'BOOLEAN',
        value: false,
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
        type: 'NUMBER',
        value: 0,
      },
      {
        subKey: 14,
        type: 'NUMBER',
        value: 0,
      },
      {
        subKey: 15,
        type: 'TEXT',
        value: '',
      },
    ],
  },
];

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const pageData = useRecoilValue(pageDataAtom);
  const [isComplete, setIsComplete] = useState(false);

  const [cardData, setCardData] = useRecoilState(L01C11A03);

  const { userId } = useRecoilValue(studentAtom);

  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
  };

  const questionInfo = {
    text: '2. Choose your role and practice the dialogue.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <>Jenny, you seem a bit down. What's wrong?</>,
      audioSrc: '/L01/C11/A03/HE1-L01-C11-A03-P02-01.mp3',
    },
    {
      type: 'B',
      content: <>Well, my band's getting ready for the school festival, but Rory, the guitarist, is always late. I'm really stressed out.</>,
      audioSrc: '/L01/C11/A03/HE1-L01-C11-A03-P02-02.mp3',
    },
    {
      type: 'A',
      content: <>I understand how you feel. Have you considered discussing your concerns with him openly?</>,
      audioSrc: '/L01/C11/A03/HE1-L01-C11-A03-P02-03.mp3',
    },
    {
      type: 'B',
      content: <>No. I'm worried it might harm our friendship.</>,
      audioSrc: '/L01/C11/A03/HE1-L01-C11-A03-P02-04.mp3',
    },
    {
      type: 'A',
      content: <>You've argued with each other before, but you've always made up and gotten along. I think he'll understand.</>,
      audioSrc: '/L01/C11/A03/HE1-L01-C11-A03-P02-05.mp3',
    },
    {
      type: 'B',
      content: <>Okay, I'll try. Thanks, Dad.</>,
      audioSrc: '/L01/C11/A03/HE1-L01-C11-A03-P02-06.mp3',
    },
  ];

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleRoleButtonClick = ({ role }: { role: 'A' | 'B' }) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        role: role,
        aStep: 0,
        bStep: 0,
        listenComplete: {},
        audioData: {},
      },
    }));

    changeData('P02', 1, 15, role);
    changeData('P02', 1, 13, 0);
    changeData('P02', 1, 14, 0);
    setStep(0);
  };

  const getRoleButtonColor = ({ role }: { role: 'A' | 'B' }) => {
    const COLOR = {
      select: {
        A: EStyleButtonTypes.BLUE,
        B: EStyleButtonTypes.BROWN,
      },
      unSelect: {
        A: EStyleButtonTypes.LIGHTBLUE,
        B: EStyleButtonTypes.LIGHTBROWN,
      },
    };

    if (cardData.p02.role === role) {
      return COLOR['select'][role];
    }

    return COLOR['unSelect'][role];
  };

  const setStep = (step: number, role?: 'A' | 'B') => {
    const combinedRole = role || cardData.p02.role;
    if (combinedRole === 'A') {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          aStep: step,
        },
      }));

      changeData('P02', 1, 13, step);
    } else if (combinedRole === 'B') {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          bStep: step,
        },
      }));
      changeData('P02', 1, 14, step);
    }
  };

  const handleRecordStart = () => {
    setStep(1);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C11/A03',
      changeData,
      mainKey: 1,
      page: 'p02',
      subjectCode: 'HE10',
      subKey: index,
      userId,
      setFunction: setCardData,
    });

    setStep(index + 1);
  };

  const makeListenData = async ({
    originCardData,
    userSubmissionList,
  }: {
    originCardData:
      | {
          [x: string]: boolean;
        }
      | undefined;
    userSubmissionList: userSubmissionType<boolean>[];
  }) => {
    const newCardData: {
      [x: string]: boolean;
    } = originCardData ? { ...originCardData } : {};

    const audioDatas = userSubmissionList[0].inputData.filter((value, index) => (value.subKey as number) >= 7 && (value.subKey as number) <= 12);
    for (const data of audioDatas) {
      newCardData[(data.subKey as number) - 6] = data.value ?? false;
    }

    return newCardData;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData | boolean | number>(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });
        const newListenData = await makeListenData({
          originCardData: cardData.p02.listenComplete,
          userSubmissionList: userSubmissionList as userSubmissionType<boolean>[],
        });

        const savedRole = userSubmissionList[0].inputData.find(value => value.subKey === 15)?.value as unknown as 'A' | 'B';

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            role: savedRole,
            audioData: newAudioData,
            listenComplete: newListenData,
            aStep: userSubmissionList[0].inputData.find(value => value.subKey === 13)?.value as number,
            bStep: userSubmissionList[0].inputData.find(value => value.subKey === 14)?.value as number,
            isSubmitted: isSubmitted,
          },
        }));
      }

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const handleAudioEnded = (index: number) => {
    if (cardData.p02.listenComplete?.[index]) {
      return;
    }

    const newListenComplete = { ...cardData.p02.listenComplete };
    newListenComplete[index] = true;
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        listenComplete: newListenComplete,
      },
    }));

    changeData('P02', 1, index + 6, true);
    setStep(index + 1);
  };

  const handleSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData;
    }
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        isSubmitted: true,
      },
    }));
    submitData('P02', userSubmission);
  };

  const memoStep = useMemo(() => {
    let step = 0;
    if (cardData.p02.role === 'A') {
      step = cardData.p02.aStep ?? 0;
    } else if (cardData.p02.role === 'B') {
      step = cardData.p02.bStep ?? 0;
    }

    return step;
  }, [cardData.p02.aStep, cardData.p02.bStep, cardData.p02.role]);

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

  useEffect(() => {
    if (cardData.p02.role === 'A') {
      changeData('P02', 1, 13, memoStep);
    } else if (cardData.p02.role === 'B') {
      changeData('P02', 1, 14, memoStep);
    }
  }, [memoStep]);

  useEffect(() => {
    if (!cardData.p02.role) {
      return;
    }

    let complete = true;

    if (cardData.p02.role === 'A') {
      for (const tmpStep of [1, 3, 5]) {
        if (!cardData.p02.audioData?.[tmpStep]) {
          complete = false;
          break;
        }
      }

      for (const tmpStep of [2, 4, 6]) {
        if (!cardData.p02.listenComplete?.[tmpStep]) {
          complete = false;
          break;
        }
      }
    } else if (cardData.p02.role === 'B') {
      for (const tmpStep of [2, 4, 6]) {
        if (!cardData.p02.audioData?.[tmpStep]) {
          complete = false;
          break;
        }
      }

      for (const tmpStep of [1, 3, 5]) {
        if (!cardData.p02.listenComplete?.[tmpStep]) {
          complete = false;
          break;
        }
      }
    }

    setIsComplete(complete);
  }, [cardData.p02.audioData, cardData.p02.listenComplete, cardData.p02.role]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitDisabled={!isComplete || cardData.p02.isSubmitted}
      onSubmit={handleSubmitAnswer}
      submitLabel='완료하기'
      useExtend
    >
      <ListHeader align={'space-between'} fontSize={'28px'}>
        <Box hAlign={'center'}>
          <Typography size={EStyleFontSizes.MEDIUM}>나의 역할 선택하기</Typography>
          <Box gap={'8px'} display='flex'>
            <Button
              onClick={() => cardData.p02.role !== 'A' && handleRoleButtonClick({ role: 'A' })}
              color={getRoleButtonColor({ role: 'A' })}
              width='127px'
              style={{ borderRadius: '8px', fontSize: '24px' }}
              useShadow
              disabled={cardData.p02.isSubmitted}
            >
              A
            </Button>
            <Button
              onClick={() => cardData.p02.role !== 'B' && handleRoleButtonClick({ role: 'B' })}
              color={getRoleButtonColor({ role: 'B' })}
              width='127px'
              style={{ borderRadius: '8px', fontSize: '24px' }}
              disabled={cardData.p02.isSubmitted}
              useShadow
            >
              B
            </Button>
          </Box>
        </Box>
        {memoStep === 0 && !cardData.p02.isSubmitted && (
          <Box hAlign={'center'}>
            <RecordButton data-tooltip-id='recordStartButton' label={'start'} onClick={handleRecordStart} />
          </Box>
        )}
      </ListHeader>
      <Box useFull>
        <Scroll maxHeight='340px'>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap>
                <Box>
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
                {index <= memoStep && (
                  <Box width={'30%'} hAlign='flex-end' vAlign='flex-start'>
                    {value?.type === cardData.p02.role ? (
                      <Recorder
                        recorderIndex={index}
                        initialData={cardData.p02.audioData?.[index]}
                        readOnly={cardData.p02.isSubmitted}
                        onSubmit={() => {
                          onSubmitRecorder(index);
                        }}
                        onClick={() => {
                          handleRecorderClose(index);
                          handleAudioReset(0);
                        }}
                        ref={ref => {
                          recorderRef.current[index] = ref;
                        }}
                      />
                    ) : (
                      !cardData.p02.isSubmitted && (
                        <SimpleAudioPlayer
                          data-tooltip-id='recordStartButton'
                          audioSrc={value?.audioSrc ?? ''}
                          onEnded={() => {
                            handleAudioEnded(index);
                          }}
                          ref={ref => {
                            audioRefs.current[index] = ref;
                          }}
                          onChangeStatus={() => handleAudioReset(index)}
                        />
                      )
                    )}
                  </Box>
                )}
              </BoxWrap>
            )}
          </List>
        </Scroll>
      </Box>
      <OverlayTooltip
        color='black'
        isShadow
        backgroundColor='var(--color-white)'
        openOnClick
        showClose
        place='left'
        type='normal'
        id='recordStartButton'
        fontSize={'24px'}
      >
        역할을 선택하세요
      </OverlayTooltip>
    </Container>
  );
};

export default P02;
