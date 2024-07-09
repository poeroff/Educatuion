import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  Recorder,
  Box,
  Typography,
  IRecorderRef,
  IUploadRecordData,
  EStyleButtonTypes,
  IQuestionProps,
  List,
  Label,
  makeAudioData,
} from '@maidt-cntn/ui';
import { ExampleBox, Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C02A04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
}

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A04);

  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write and talk about how to use various functions of digital devices.',
    size: 'small',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
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
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isSubmitted,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            audioData: newAudioData,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? truncateToMaxBytes(value) : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(pageNo, 1, 1, updatedAnswers);
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
    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === pageNo)!.userSubmission[0].inputData[1]);
    }
    submitData(pageNo, userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const checkDisableInput = () => {
    return (
      (Array.isArray(cardData.p02.answer) && cardData.p02.answer?.some(val => val === '')) || Object.values(cardData.p02.audioData!).length !== 1
    );
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/C02/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <Box>
          <Box vAlign={'center'}>
            <Typography>Can you show me how to</Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              mute myself during an online
            </Typography>
          </Box>
          <Typography weight={'var(--font-weight-bold)'}>meeting?</Typography>
        </Box>
      ),
    },
    {
      type: 'B',
      content: (
        <Box>
          <Typography>
            Just
            <Typography weight={'var(--font-weight-bold)'}>click the microphone icon to turn off the sound.</Typography>
          </Typography>
        </Box>
      ),
    },
  ];

  const answerData: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <Box>
          <Typography>Can you show me how to</Typography>
          <Input
            name='value1'
            width={'380px'}
            value={cardData.p02.answer?.[0]}
            onChange={e => handleInputChange(0, e.target.value)}
            maxLength={2000}
            inputSize={'x-small'}
            readOnly={cardData.p02.isSubmitted}
            placeholder='e.g. scan a QR code with a phone'
            ariaLabel='1번 답란'
          />
          &nbsp;?
        </Box>
      ),
    },
    {
      type: 'B',
      content: (
        <>
          <Typography>Just</Typography>
          <Input
            name='value2'
            width={'670px'}
            value={cardData.p02.answer?.[1]}
            onChange={e => handleInputChange(1, e.target.value)}
            maxLength={2000}
            inputSize={'x-small'}
            readOnly={cardData.p02.isSubmitted}
            placeholder='e.g. open the camera app and point your camera at the code'
            ariaLabel='2번 답란'
          />
          &nbsp;.
        </>
      ),
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => submitAnswer()}
      submitBtnColor={cardData.p02.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p02.isSubmitted || checkDisableInput()}
    >
      <ExampleBox color='emerald' title='Function and How to Use'>
        <Box padding='4px 26px'>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap key={index} alignItems='center'>
                <Box vAlign={'flex-start'}>
                  <Box marginRight={0} marginTop={5}>
                    <Label value={value?.type} type={'paint'} lineColor='var(--color-grey-600)' />
                  </Box>
                  <Box>
                    <div>{value?.content}</div>
                  </Box>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Box>
      </ExampleBox>
      <Box marginLeft={40} marginTop={20}>
        <List<IListenAndAnswer> data={answerData}>
          {({ value, index = 1 }) => (
            <BoxWrap key={index} alignItems='center'>
              <Box marginRight={0}>
                <Label value={value?.type} type={'paint'} lineColor='var(--color-grey-600)' />
              </Box>
              <Box useFull>
                <div>{value?.content}</div>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={2}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          readOnly={cardData.p02.isSubmitted}
          ref={recorderRef}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;
