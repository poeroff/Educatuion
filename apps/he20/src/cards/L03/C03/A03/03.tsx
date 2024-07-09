import {
  TMainHeaderInfoTypes,
  Typography,
  List,
  BoxWrap,
  Box,
  Label,
  Input,
  SimpleAudioPlayer,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  EStyleButtonTypes,
  Recorder,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useRef } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L03C03A03 } from './store';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A03);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<IRecorderRef>(null);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  interface IListenAndAnswer {
    type: string;
    content: React.ReactNode;
    audioSrc?: string;
    recordButton: React.ReactNode;
  }

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 3)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write your own scripts and do a role-play.',
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
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 3,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const onSubmitText = () => {
    if (cardData.p03.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === 'P03')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P03')!.userSubmission[0].inputData;
    }

    handleAudioReset(0);
    submitData('P03', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: e.target.value } }));
    changeData('P03', 1, 1, e.target.value);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleSetComplete = (index: number, value: boolean) => {
    const updatedRecords = cardData.p03.isRecordDone?.map((val, idx) => (idx === index ? value : val));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        isRecordDone: updatedRecords,
      },
    }));
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <>
          Are there any rules to follow in{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            the theater
          </Typography>
          ?
        </>
      ),
      recordButton: (
        <SimpleAudioPlayer
          audioSrc={'/L03/C03/A03/HE2-L03-C03-A03-01-1.mp3'}
          ref={ref => {
            audioRefs.current[1] = ref;
          }}
          ariaLabel={'1번 지문 듣기 버튼'}
          onChangeStatus={() => handleAudioReset(1)}
          onEnded={() => handleSetComplete(1, true)}
        />
      ),
    },
    {
      type: 'You',
      content: (
        <>
          Yes, you’re not allowed to{' '}
          <Input
            width={'290px'}
            placeholder='e.g. make loud noise'
            maxLength={20}
            value={cardData.p03.answer}
            onChange={handleInputChange}
            ariaLabel='답 입력란'
            readOnly={cardData.p03.isSubmitted}
          />
          .
        </>
      ),
      recordButton: (
        <Recorder
          recorderIndex={2}
          initialData={cardData.p03.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
            handleSetComplete(2, true);
          }}
          onClick={() => {
            handleAudioReset(0);
          }}
          ref={recorderRef}
          readOnly={cardData.p03.isSubmitted}
        />
      ),
    },
    {
      type: 'A',
      content: 'I see. Thank you for the information.',
      recordButton: (
        <SimpleAudioPlayer
          audioSrc={'/L03/C03/A03/HE2-L03-C03-A03-01-3.mp3'}
          ref={ref => {
            audioRefs.current[2] = ref;
          }}
          ariaLabel={'3번 지문 듣기 버튼'}
          onChangeStatus={() => handleAudioReset(2)}
          onEnded={() => handleSetComplete(3, true)}
        />
      ),
    },
    {
      type: 'You',
      content: 'My pleasure.',
      recordButton: (
        <Recorder
          recorderIndex={3}
          initialData={cardData.p03.audioData?.[3]}
          onSubmit={() => {
            onSubmitRecorder(3);
            handleSetComplete(4, true);
          }}
          onClick={() => {
            handleAudioReset(0);
          }}
          ref={recorderRef}
          readOnly={cardData.p03.isSubmitted}
        />
      ),
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'You' : 'A';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'A' ? 'var(--color-blue-100)' : 'var(--color-orange-200)';
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const checkDisableInput = () => {
    return (
      !isNotEmptyString(cardData.p03.answer || '') ||
      Object.values(cardData.p03.audioData!).length !== 2 ||
      !cardData.p03.isRecordDone?.every(val => val) ||
      cardData.p03.isSubmitted
    );
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={cardData.p03.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p03.isSubmitted || checkDisableInput()}
      onSubmit={onSubmitText}
    >
      <Box marginTop={'40px'}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap marginBottom={'20px'}>
              <Box>
                <Label value={value?.type || ''} type={'paint'} size={'x-small'} background={labelColor(index)} />
              </Box>
              <Box width={'80%'}>{value?.content}</Box>
              <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
                {(cardData.p03.isRecordDone?.[index - 1] || cardData.p03.isSubmitted) && value?.recordButton}
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P03;
