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

const P04 = () => {
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
    text: `A가 되어 좋아하는 운동에 대해 묻는 대사를 완성한 후, 대화를 연습해 봅시다.`,
  };

  const handleChangeInput = (value: string, subKey: number) => {
    switch (subKey) {
      case 5:
        setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
        break;
      case 6:
        setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
        break;
    }
    changeData('P04', 1, subKey, value);
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
      audioSrc: '/L01/C02/A09/ME1-L01-C02-A09-P04-1.mp3',
    },
    {
      type: 'A',
      labelColor: 'var(--color-blue-100)',
    },
    {
      type: 'B',
      labelColor: 'var(--color-orange-200)',
      audioSrc: '/L01/C02/A09/ME1-L01-C02-A09-P04-2.mp3',
    },
  ];

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
      cardPath: 'L01/C02/A09',
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
    const audioIndex = subKey - 3;
    const newIsAudioPlayed = cardData.p04.isAudioPlayed?.map((v, i) => (i === audioIndex ? true : v));
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isAudioPlayed: newIsAudioPlayed } }));
    changeData('P04', 1, subKey, true);
  };

  const onSubmitAnswer = () => {
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p04.audioData,
          userSubmissionList,
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[4]?.value || cardData.p04.answer1 || '',
            answer2: userSubmissionList[0].inputData[5]?.value || cardData.p04.answer2 || '',
            isAudioPlayed: [
              userSubmissionList[0].inputData[2]?.value || cardData.p04.isAudioPlayed?.[0] || false,
              userSubmissionList[0].inputData[3]?.value || cardData.p04.isAudioPlayed?.[1] || false,
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={isSubmitDisabled || cardData.p04.isSubmitted}
      submitBtnColor={
        isSubmitDisabled ? EStyleButtonTypes.SECONDARY : !cardData.p04.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
      }
    >
      <Box>
        <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
          <Box marginRight='8px'>
            <Label value={data[0].type} type={'paint'} background={data[0].labelColor} />
          </Box>
          <Box width={'80%'} whiteSpace='nowrap'>
            <Typography usePre>
              Hi, I'm{' '}
              <Input
                width='300px'
                placeholder='내용을 넣어 주세요.'
                value={cardData.p04.answer1}
                onChange={e => handleChangeInput(e.target.value, 5)}
                readOnly={cardData.p04.isSubmitted}
                ariaLabel='A의 1번째 대사 빈칸'
              />
              .{'\n'}Nice to meet you.
            </Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
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
          </Box>
        </BoxWrap>

        <BoxWrap marginBottom={'18px'} lineHeight={'40px'}>
          <Box marginRight='8px'>
            <Label value={data[1].type} type={'paint'} background={data[1].labelColor} />
          </Box>
          <Box width={'80%'} whiteSpace='nowrap'>
            <Typography usePre>{'Hi. My name is Suho.\nNice to meet you, too.'}</Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <HiddenDiv isHidden={isEmptyAudioData(cardData.p04.audioData?.[1])}>
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
          <Box marginRight='8px'>
            <Label value={data[2].type} type={'paint'} background={data[2].labelColor} />
          </Box>
          <Box width={'80%'} whiteSpace='nowrap'>
            <Typography usePre>
              What’s your favorite{' '}
              <Input
                width='300px'
                placeholder='내용을 넣어 주세요.'
                value={cardData.p04.answer2}
                onChange={e => handleChangeInput(e.target.value, 6)}
                readOnly={cardData.p04.isSubmitted}
                ariaLabel='A의 2번째 대사 빈칸'
              />
              ?
            </Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <HiddenDiv isHidden={isEmptyAudioData(cardData.p04.audioData?.[1]) || !cardData.p04.isAudioPlayed?.[0]}>
              <Recorder
                recorderIndex={2}
                initialData={cardData.p04.audioData?.[2]}
                readOnly={cardData.p04.isSubmitted}
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
            <Typography>My favorite sport is basketball.</Typography>
          </Box>
          <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
            <HiddenDiv
              isHidden={
                isEmptyAudioData(cardData.p04.audioData?.[1]) || !cardData.p04.isAudioPlayed?.[0] || isEmptyAudioData(cardData.p04.audioData?.[2])
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
