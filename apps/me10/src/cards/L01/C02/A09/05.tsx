import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IAudioData,
  Input,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Label,
  makeAudioData,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A09 } from './store';
import { studentAtom } from '@/stores/student';
import { useEffect, useRef } from 'react';
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

const P05 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L01C02A09);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'talkTogether',
  };

  const questionInfo = {
    text: `B가 되어 좋아하는 계절에 대해 묻는 말에 답하는 대사를 완성한 후, 대화를 연습해 봅시다.`,
  };

  const handleChangeInput = (value: string, subKey: number) => {
    switch (subKey) {
      case 5:
        setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: value } }));
        break;
      case 6:
        setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer2: value } }));
        break;
    }
    changeData('P05', 1, subKey, value);
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L01/C02/A09/ME1-L01-C02-A09-P05-1.mp3',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
    },
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
      audioSrc: '/L01/C02/A09/ME1-L01-C02-A09-P05-2.mp3',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
    },
  ];

  const isEmptyAudioData = (data: IAudioData | null | undefined) => {
    return !data || Object.keys(data).length === 0;
  };

  const isSubmitDisabled =
    !isNotEmptyString(cardData.p05.answer1 || '') ||
    !isNotEmptyString(cardData.p05.answer2 || '') ||
    Object.values(cardData.p05.audioData!).some(isEmptyAudioData) ||
    !cardData.p05.isAudioPlayed?.every(value => value);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C02/A09',
      changeData,
      mainKey: 1,
      page: 'p05',
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
    const newIsAudioPlayed = cardData.p05.isAudioPlayed?.map((v, i) => (i === audioIndex ? true : v));
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isAudioPlayed: newIsAudioPlayed } }));
    changeData('P05', 1, subKey, true);
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P05')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P05')!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));
    submitData('P05', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p05.audioData,
          userSubmissionList,
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[4]?.value || cardData.p05.answer1 || '',
            answer2: userSubmissionList[0].inputData[5]?.value || cardData.p05.answer2 || '',
            isAudioPlayed: [
              userSubmissionList[0].inputData[2]?.value || cardData.p05.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[3]?.value || cardData.p05.isAudioPlayed?.[1] || false,
            ],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }

      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={isSubmitDisabled || cardData.p05.isSubmitted}
      submitBtnColor={
        isSubmitDisabled ? EStyleButtonTypes.SECONDARY : !cardData.p05.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
      }
    >
      <Box>
        <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
          <Box marginRight='8px'>
            <Label value={data[0].type} type={'paint'} background={data[0].labelColor} />
          </Box>
          <Box width={'80%'} whiteSpace='nowrap'>
            <Typography usePre>Hi, I'm Jisun.{'\n'}Nice to meet you.</Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <SimpleAudioPlayer
              ref={ref => {
                audioRefs.current[3] = ref;
              }}
              audioSrc={data[0]?.audioSrc ?? ''}
              ariaLabel={`A의 1번 지문 듣기`}
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
              Hi. My name is{' '}
              <Input
                width='270px'
                placeholder='내용을 넣어 주세요.'
                value={cardData.p05.answer1}
                onChange={e => handleChangeInput(e.target.value, 5)}
                readOnly={cardData.p05.isSubmitted}
                ariaLabel='B의 1번째 대사 빈칸'
              />
              .{'\n'}Nice to meet you, too.
            </Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <HiddenDiv isHidden={!cardData.p05.isAudioPlayed?.[0]}>
              <Recorder
                recorderIndex={1}
                initialData={cardData.p05.audioData?.[1]}
                readOnly={cardData.p05.isSubmitted}
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
          <Box marginRight='8px'>
            <Label value={data[2].type} type={'paint'} background={data[2].labelColor} />
          </Box>
          <Box width={'80%'} whiteSpace='nowrap'>
            <Typography usePre>What’s your favorite season?</Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <HiddenDiv isHidden={!cardData.p05.isAudioPlayed?.[0] || isEmptyAudioData(cardData.p05.audioData?.[1])}>
              <SimpleAudioPlayer
                ref={ref => {
                  audioRefs.current[4] = ref;
                }}
                audioSrc={data[2]?.audioSrc ?? ''}
                ariaLabel={`A의 2번 지문 듣기`}
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
            <Typography>
              My favorite season is{' '}
              <Input
                width='300px'
                placeholder='내용을 넣어 주세요.'
                value={cardData.p05.answer2}
                onChange={e => handleChangeInput(e.target.value, 6)}
                readOnly={cardData.p05.isSubmitted}
                ariaLabel='B의 2번째 대사 빈칸'
              />
              .
            </Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <HiddenDiv
              isHidden={!cardData.p05.isAudioPlayed?.[0] || isEmptyAudioData(cardData.p05.audioData?.[1]) || !cardData.p05.isAudioPlayed?.[1]}
            >
              <Recorder
                recorderIndex={2}
                initialData={cardData.p05.audioData?.[2]}
                readOnly={cardData.p05.isSubmitted}
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
    </Container>
  );
};

export default P05;

const HiddenDiv = styled.div<{ isHidden: boolean }>(props => ({
  visibility: props.isHidden ? 'hidden' : 'visible',
  width: props.isHidden ? 0 : '',
  height: props.isHidden ? 0 : '',
  overflow: props.isHidden ? 'hidden' : 'auto',
  transform: props.isHidden ? 'scale(0)' : '',
}));
