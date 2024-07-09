import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  Recorder,
  Box,
  Question,
  Typography,
  IRecorderRef,
  EStyleButtonTypes,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { ExampleBox, Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A03 } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A03);

  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const pageNum = 'P02';
  const subjectCode = 'HE20';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 2)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write and talk about jobs that will be popular in the future.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: subjectCode,
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(pageNum, 1, 1, updatedAnswers);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === pageNum)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === pageNum)!.userSubmission[0].inputData[1]);
    }
    submitData(pageNum, userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: index,
      userId,
    });
  };

  const handleSetComplete = (index: number, value: boolean) => {
    const newArray = [...cardData.p02!.isRecordDone!];
    newArray[index] = value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isRecordDone: newArray } }));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={submitAnswer}
      submitDisabled={cardData.p02.isSubmitted || !(cardData.p02.isRecordDone?.[0] && cardData.p02.answer?.every(value => isNotEmptyString(value)))}
      submitBtnColor={
        cardData.p02.isSubmitted || !(cardData.p02.isRecordDone?.[0] && cardData.p02.answer?.every(value => isNotEmptyString(value)))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='center'>
        <Box flexDirection='column'>
          <Box width='829px' paddingTop={'70px'}>
            <ExampleBox color='green' title='Popular Jobs in the Future'>
              <Question type='dot' size='small'>
                <Typography useGap={false}>
                  <Typography useGap={false}>I believe</Typography>{' '}
                  <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                    white-hat hackers
                  </Typography>{' '}
                  <Typography useGap={false}>will be one of the most popular</Typography>
                  <Typography useGap={false}>jobs in the future. That’s because</Typography>{' '}
                  <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                    network security is
                  </Typography>{' '}
                  <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                    becoming more important due to
                  </Typography>{' '}
                  <Input
                    width={'300px'}
                    maxLength={30}
                    placeholder='e.g. genetic researchers'
                    value={cardData.p02.answer?.[0]}
                    onChange={e => handleInputChange(0, e.target.value)}
                    ariaLabel='1번 답란'
                    readOnly={cardData.p02.isSubmitted}
                    inputSize='x-small'
                  />{' '}
                  <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                    the rise of online threats.
                  </Typography>
                </Typography>
              </Question>
            </ExampleBox>
          </Box>
          <Box alignItems='start' paddingLeft='14px' paddingTop='15px' vAlign='flex-start' hAlign='left'>
            <Typography useGap={false}>
              <Question type={'dot'} size='small'>
                <Typography useGap={false}>I believe</Typography>
                <Box paddingLeft={'10px'}></Box>
                <Input
                  width={'670px'}
                  maxLength={70}
                  placeholder='e.g. genetics is helpful in finding and reducing the risks of'
                  value={cardData.p02.answer?.[1]}
                  onChange={e => handleInputChange(1, e.target.value)}
                  ariaLabel='2번 답란'
                  readOnly={cardData.p02.isSubmitted}
                  inputSize='x-small'
                />
              </Question>
              <Box paddingLeft={'25px'}>
                <Typography useGap={false}>will be one of the most popular jobs in the future. That’s because</Typography>{' '}
                <Input
                  width={'200px'}
                  maxLength={30}
                  placeholder='serious diseases.'
                  value={cardData.p02.answer?.[2]}
                  onChange={e => handleInputChange(2, e.target.value)}
                  ariaLabel='3번 답란'
                  readOnly={cardData.p02.isSubmitted}
                  inputSize='x-small'
                />
                <Typography>.</Typography>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={1}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
            handleSetComplete(0, true);
          }}
          onRefresh={() => {
            handleSetComplete(0, false);
          }}
          readOnly={cardData.p02.isSubmitted}
          ref={recorderRef}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;
