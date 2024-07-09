import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  List,
  makeAudioData,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L01C02A04 } from '@/cards/L01/C02/A04/store';
import { studentAtom } from '@/stores/student';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  conversationType: string;
  color?: string;
  audioSrc?: string;
}

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
        type: 'AUDIO',
        value: {},
      },
    ],
  },
];

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const subjectCode = 'ME10';
  const [cardData, setCardData] = useRecoilState(L01C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<IRecorderRef | null>(null);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [isAudioDone, setIsAudioDone] = useState(false);

  const isSubmittable = useMemo(() => {
    return (
      cardData[pageKey].answer &&
      isNotEmptyString(cardData[pageKey].answer as string) &&
      cardData[pageKey].isRecordDone &&
      isAudioDone &&
      Object.values(cardData[pageKey].audioData!).every(value => value && Object.keys(value).length > 0)
    );
  }, [cardData[pageKey].answer, isAudioDone]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A',
    headerPattern: 'icon',
    iconType: 'meSmallTalk',
  };

  const questionInfo = {
    text: 'A가 되어 대사를 완성한 후, 대화를 연습해 봅시다.',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: e.target.value } }));
    changeData(pageNumber, 1, 1, e.target.value);
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <Typography>
          {"Hi, I'm "}
          <Input
            readOnly={cardData[pageKey].isSubmitted}
            value={cardData[pageKey].answer}
            maxLength={50}
            onChange={handleInputChange}
            placeholder='내용을 넣어 주세요.'
            width='300px'
            ariaLabel='답란'
          />
          {'.\nNice to meet you.'}
        </Typography>
      ),
      conversationType: 'speak',
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: <Typography>{'Nice to meet you, too.\nMy name is Jaemin.'}</Typography>,
      audioSrc: '/L01/C02/A04/ME1-L01-C02-A04-P02.mp3',
      conversationType: 'listen',
    },
  ];

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/C02/A04',
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 2,
      userId,
      setFunction: setCardData,
    });
  };

  const handleRecordDone = () => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isRecordDone: true,
      },
    }));
  };

  const onSubmitAnswer = () => {
    if (cardData[pageKey].isSubmitted) return;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNumber)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNumber)!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageNumber, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            isSubmitted,
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            audioData: newAudioData,
          },
        }));
      }

      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isSubmittable}
      onSubmit={onSubmitAnswer}
      submitBtnColor={
        !isSubmittable ? EStyleButtonTypes.SECONDARY : !cardData[pageKey].isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
      }
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            <Box>
              <Label value={value?.type || ''} type={'paint'} background={value?.color} />
            </Box>
            <Box width={'70%'}>{value?.content}</Box>
            <Box width={'30%'} hAlign='flex-end'>
              {value?.conversationType === 'listen' && cardData[pageKey].isRecordDone && !cardData[pageKey].isSubmitted && (
                <SimpleAudioPlayer
                  audioSrc={value?.audioSrc ?? ''}
                  onChangeStatus={() => handleAudioReset(index)}
                  onEnded={() => setIsAudioDone(true)}
                  ariaLabel={index + '번 지문 듣기 버튼'}
                  ref={ref => {
                    audioRefs.current[index] = ref;
                  }}
                />
              )}
              {value?.conversationType === 'speak' && (
                <Recorder
                  recorderIndex={1}
                  onSubmit={() => {
                    handleRecordDone();
                    onSubmitRecorder();
                  }}
                  initialData={cardData[pageKey].audioData?.[2]}
                  readOnly={cardData[pageKey].isSubmitted}
                  onClick={() => {
                    handleAudioReset(0);
                  }}
                  ref={ref => {
                    recorderRef.current = ref;
                  }}
                />
              )}
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P02;
