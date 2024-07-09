import { IListenAndAnswer } from '@maidt-cntn/pages/HE-009-01-API';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IQuestionProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  Input,
  InputStatus,
  Label,
  List,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { L05C02A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useRef, useState } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const pageNo = 'P02';
  const pageKey = 'p02';
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const cardPath = 'L05/C02/A04';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L05C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const [isRecordingEnd, setIsRecordingEnd] = useState<boolean>(false);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meSmallTalk',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: 'B가 되어 대사를 완성한 후, 대화를 연습해 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 3,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      conversationType: 'listen',
      content: (
        <Box>
          <Typography useGap={false}>What are you going to do after school?</Typography>
        </Box>
      ),
      color: 'var(--color-blue-200)',
      audioSrc: '/L05/C02/A04/ME1-L05-C02-A04-P02.mp3',
    },
    {
      type: 'B',
      conversationType: 'speak',
      content: (
        <Box vAlign='middle'>
          <Typography useGap={false}>I’m going to &nbsp;</Typography>
          <Input
            maxLength={50}
            placeholder='내용을 넣어 주세요.'
            minWidth='250px'
            name={'inputValue'}
            value={cardData[pageKey]?.answer}
            readOnly={cardData[pageKey]?.isSubmitted}
            status={
              cardData[pageKey]?.isSubmitted
                ? InputStatus.ENABLE
                : isNotEmptyString(cardData[pageKey]?.answer ?? '')
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            ariaLabel='답란'
            onChange={e => handleInputChangeEvent(e.target.value)}
          />
        </Box>
      ),
      color: 'var(--color-orange-100)',
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          subjectCode: subjectCode,
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey]?.answer,
            listeningData: userSubmissionList[0].inputData[1]?.value || cardData[pageKey]?.listeningData,
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    setIsRecordingEnd(
      Object.values(cardData[pageKey].audioData!).every(value => {
        return value && Object.keys(value).length > 0;
      }),
    );
  }, [cardData[pageKey].audioData]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChangeEvent = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleListeningEnd = () => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listeningData: true,
      },
    }));
    changeData(pageNo, 1, 2, true);
  };

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

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: index,
      userId,
      setFunction: (updateFunc: any) => {
        setCardData((prev: any) => {
          const newCardData = { ...prev };

          if (!newCardData[pageKey]) {
            newCardData[pageKey] = {};
          }

          if (!newCardData[pageKey].audioData) {
            newCardData[pageKey].audioData = {};
          }

          updateFunc(newCardData);

          return newCardData;
        });
      },
    });
    setIsRecordingEnd(true);
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNo)!.userSubmission[0].inputData;
    }

    handleAudioReset(3);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageNo, userSubmission);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={
        cardData[pageKey]?.isSubmitted || !isRecordingEnd || !cardData[pageKey]?.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData[pageKey]?.isSubmitted || !isRecordingEnd || !cardData[pageKey]?.answer}
      onSubmit={onSubmitAnswer}
    >
      <List data={data}>
        {({ value, index = 1 }) => {
          return (
            <BoxWrap paddingBottom={40}>
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color} />
              </Box>
              <Box width={'70%'}>{value?.content}</Box>
              {
                <Box width={'30%'} hAlign='flex-end' gap='6px'>
                  {(index === 1 || value?.conversationType === 'listen') && (
                    <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} ariaLabel='A번 지문 듣기 버튼' onEnded={handleListeningEnd} />
                  )}
                  {value?.conversationType === 'speak' && cardData[pageKey]?.listeningData === true && (
                    <Recorder
                      recorderIndex={3}
                      initialData={cardData[pageKey].audioData?.[3]}
                      readOnly={cardData[pageKey]?.isSubmitted}
                      onSubmit={() => onSubmitRecorder(3)}
                      onClick={() => {
                        handleRecorderClose(3);
                        handleAudioReset(3);
                      }}
                      ref={ref => {
                        recorderRef.current[3] = ref;
                      }}
                    />
                  )}
                </Box>
              }
            </BoxWrap>
          );
        }}
      </List>
    </Container>
  );
};

export default P02;
