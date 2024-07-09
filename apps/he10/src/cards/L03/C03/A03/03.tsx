import {
  BoxWrap,
  Recorder,
  Box,
  Typography,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  List,
  IAudioData,
  Label,
  Input,
  SimpleAudioPlayer,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C03A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  recordButton: React.ReactNode;
  audioSrc?: string;
}

const P03 = () => {
  const currentPage = 'P03';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 3)',
  };

  const questionInfo = {
    text: `Write your own scripts and do a role-play.`,
  };

  const formerInputRef = useRef<HTMLInputElement>(null);
  const latterInputRef = useRef<HTMLInputElement>(null);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
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
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 5,
          type: 'TEXT_LIST',
          value: ['', ''],
        },
        {
          subKey: 6,
          type: 'RECORDER',
          value: {},
        },
        {
          subKey: 7,
          type: 'RECORDER',
          value: {},
        },
      ],
    },
  ];

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            isSubmitted,
            isDoneRecord1: userSubmissionList[0].inputData[0]?.value || cardData.p03.isDoneRecord1,
            isDoneRecord2: userSubmissionList[0].inputData[1]?.value || cardData.p03.isDoneRecord2,
            isDoneAudio1: userSubmissionList[0].inputData[2]?.value || cardData.p03.isDoneAudio1,
            isDoneAudio2: userSubmissionList[0].inputData[3]?.value || cardData.p03.isDoneAudio2,
            answer: userSubmissionList[0].inputData[4]?.value || cardData.p03.answer,
            audioData: [userSubmissionList[0].inputData[5]?.value, userSubmissionList[0].inputData[6]?.value] || cardData.p03.audioData,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isAnyRecordNotDone = [cardData.p03.isDoneRecord1, cardData.p03.isDoneRecord2, cardData.p03.isDoneAudio1, cardData.p03.isDoneAudio2].some(
    record => record === false,
  );

  const handleSetComplete = (audioData: IAudioData, index: number, value: boolean) => {
    const isDoneRecordKeys = ['isDoneRecord1', 'isDoneRecord2'];

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        [isDoneRecordKeys[index]]: value,
      },
    }));

    changeData(currentPage, 1, index + 1, value);

    const userInputs = [...cardData.p03.audioData];
    userInputs[index] = audioData;
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        audioData: userInputs,
      },
    }));
    changeData(currentPage, 1, index + 6, audioData);
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newAnswer = [...cardData.p03.answer];
    newAnswer[index] = event.target.value;

    const value = event.target.value;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: prev.p03.answer.map((item, idx) => (idx === index ? value : item)) } }));
    changeData(currentPage, 1, 5, newAnswer);
  };

  useEffect(() => {
    if (formerInputRef.current) {
      formerInputRef.current.style.width = 'auto';
      formerInputRef.current.style.width = `${formerInputRef.current.scrollWidth}px`;
      formerInputRef.current.style.maxWidth = '650px';
    }

    if (latterInputRef.current) {
      latterInputRef.current.style.width = 'auto';
      latterInputRef.current.style.width = `${latterInputRef.current.scrollWidth}px`;
      latterInputRef.current.style.maxWidth = '650px';
    }
  }, [cardData.p03.answer]);

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

  const data: IListenAndAnswer[] = [
    {
      type: 'You',
      content: (
        <>
          <Typography useGap={false}>
            Have you heard of &nbsp;
            <Input
              width='auto'
              minWidth={'420px'}
              textAlign='start'
              placeholder=' e.g. a 3D printing pen'
              ariaLabel='1번 답을 입력란'
              value={cardData.p03.answer[0]}
              onChange={e => handleInputChange(0, e)}
              maxLength={40}
              inputRef={formerInputRef}
              inputSize='x-small'
              readOnly={cardData.p03.isSubmitted}
            />
          </Typography>
          <br />
          <Typography useGap={false}>It's pretty cool.</Typography>
        </>
      ),
      recordButton: (
        <Recorder
          initialData={cardData.p03.audioData?.[0]}
          readOnly={cardData.p03.isSubmitted}
          recorderIndex={0}
          onSubmit={audioData => handleSetComplete(audioData, 0, true)}
          onRefresh={() => handleSetComplete({}, 0, false)}
          onClick={() => {
            handleRecorderClose(0);
            handleAudioReset(0);
          }}
          ref={ref => {
            recorderRef.current[0] = ref;
          }}
        />
      ),
    },
    {
      type: 'A',
      content: <Typography useGap={false}>No, I haven’t. What’s so special about it?</Typography>,
      recordButton: (
        <SimpleAudioPlayer
          ref={ref => {
            audioRefs.current[0] = ref;
          }}
          audioSrc={'/L03/C03/A03/HE1-L03-C03-A03-02-2.mp3'}
          onEnded={() => {
            setCardData(prev => ({
              ...prev,
              p03: {
                ...prev.p03,
                isDoneAudio1: true,
              },
            }));
            changeData(currentPage, 1, 3, true);
          }}
          onChangeStatus={() => handleAudioReset(0)}
        />
      ),
    },
    {
      type: 'You',
      content: (
        <Typography useGap={false}>
          You can &nbsp;
          <Input
            width='auto'
            minWidth={'420px'}
            textAlign='start'
            placeholder=' e.g. draw and create 3D objects'
            ariaLabel='2번 답 입력란'
            value={cardData.p03.answer[1]}
            onChange={e => handleInputChange(1, e)}
            maxLength={55}
            inputRef={latterInputRef}
            inputSize='x-small'
            readOnly={cardData.p03.isSubmitted}
          />
        </Typography>
      ),
      recordButton: (
        <Recorder
          initialData={cardData.p03.audioData?.[1]}
          readOnly={cardData.p03.isSubmitted}
          recorderIndex={1}
          onSubmit={audioData => handleSetComplete(audioData, 1, true)}
          onRefresh={() => handleSetComplete({}, 1, false)}
          onClick={() => {
            handleRecorderClose(1);
            handleAudioReset(0);
          }}
          ref={ref => {
            recorderRef.current[1] = ref;
          }}
        />
      ),
    },
    {
      type: 'A',
      content: <Typography useGap={false}>Wow, that’s awesome!</Typography>,
      recordButton: (
        <SimpleAudioPlayer
          ref={ref => {
            audioRefs.current[1] = ref;
          }}
          audioSrc={'/L03/C03/A03/HE1-L03-C03-A03-02-4.mp3'}
          onEnded={() => {
            setCardData(prev => ({
              ...prev,
              p03: {
                ...prev.p03,
                isDoneAudio2: true,
              },
            }));
            changeData(currentPage, 1, 4, true);
          }}
          onChangeStatus={() => handleAudioReset(1)}
        />
      ),
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'You' : 'A';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'A' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      submitBtnColor={
        isAnyRecordNotDone || cardData.p03.answer.some(value => value === '') || cardData.p03.isSubmitted
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={isAnyRecordNotDone || cardData.p03.answer.some(value => value === '') || cardData.p03.isSubmitted}
      onSubmit={() => {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'BOOLEAN',
                value: cardData.p03.isDoneRecord1,
              },
              {
                subKey: 2,
                type: 'BOOLEAN',
                value: cardData.p03.isDoneAudio1,
              },
              {
                subKey: 3,
                type: 'BOOLEAN',
                value: cardData.p03.isDoneRecord2,
              },
              {
                subKey: 4,
                type: 'BOOLEAN',
                value: cardData.p03.isDoneAudio2,
              },
              {
                subKey: 5,
                type: 'TEXT_LIST',
                value: cardData.p03.answer,
              },
              {
                subKey: 6,
                type: 'RECORDER',
                value: cardData.p03.audioData[0],
              },
              {
                subKey: 7,
                type: 'RECORDER',
                value: cardData.p03.audioData[1],
              },
            ],
          },
        ];
        submitData(currentPage, userSubmission);
      }}
    >
      <Box marginTop={'40px'}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap marginBottom={'20px'}>
              <Box>
                <Label value={labelStr(index)} type={'paint'} size={'x-small'} background={labelColor(index)} />
              </Box>
              <Box width={'80%'} whiteSpace='nowrap'>
                {value?.content}
              </Box>
              <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
                {(index === 1 ||
                  (index === 2 && cardData.p03.isDoneRecord1) ||
                  (index === 3 && cardData.p03.isDoneAudio1) ||
                  (index === 4 && cardData.p03.isDoneRecord2)) &&
                  value?.recordButton}
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P03;
