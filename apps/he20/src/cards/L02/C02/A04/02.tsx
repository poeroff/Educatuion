import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import {
  Box,
  BoxWrap,
  Input,
  Recorder,
  TMainHeaderInfoTypes,
  Typography,
  Question,
  EStyleSizes,
  IRecorderRef,
  IAudioData,
  IUploadRecordData,
  EStyleButtonTypes,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container, ExampleBox } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C02A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A04);

  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
  };

  const questionInfo = {
    text: 'Write and talk about which one is better in each pair.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
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
    return cardData.p02.answer?.some(val => val === '') || Object.values(cardData.p02.audioData!).length !== 1;
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L02/C02/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => submitAnswer()}
      submitBtnColor={cardData.p02.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p02.isSubmitted || checkDisableInput()}
    >
      <Box hAlign='center'>
        <Box flexDirection='column'>
          <Box width='829px'>
            <ExampleBox color='yellow' title='Which One is Better'>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                <Typography>
                  I think
                  <Typography weight={800} style={{ padding: '0px 12px' }}>
                    tablets
                  </Typography>
                  are better than
                  <Typography weight={800} style={{ padding: '0px 12px' }}>
                    laptops.
                  </Typography>
                  <br />
                  They're
                  <Typography weight={800} style={{ padding: '0px 12px' }}>
                    simpler to use
                  </Typography>
                  .
                </Typography>
              </Question>
            </ExampleBox>
          </Box>
          <Box paddingLeft='12px' paddingTop='15px'>
            <Question type='dot' size={EStyleSizes['SMALL']}>
              <Typography>
                I think{' '}
                <Input
                  width='250px'
                  name='value1'
                  value={cardData.p02.answer?.[0]}
                  onChange={e => handleInputChange(0, e.target.value)}
                  readOnly={cardData.p02.isSubmitted}
                  maxLength={33}
                  placeholder='e.g. print books'
                  ariaLabel='답란 1번'
                />{' '}
                are better than{' '}
                <Input
                  width='250px'
                  name='value2'
                  value={cardData.p02.answer?.[1]}
                  onChange={e => handleInputChange(1, e.target.value)}
                  readOnly={cardData.p02.isSubmitted}
                  maxLength={33}
                  placeholder='e.g. e-books'
                  ariaLabel='답란 2번'
                />{' '}
                .
                <br />
                <Box paddingTop='15px'>
                  They're{' '}
                  <Input
                    width='auto'
                    minWidth={'300px'}
                    name='value3'
                    value={cardData.p02.answer?.[2]}
                    onChange={e => handleInputChange(2, e.target.value)}
                    readOnly={cardData.p02.isSubmitted}
                    maxLength={33}
                    placeholder='e.g. easier on the eyes'
                    ariaLabel='답란 3번'
                  />{' '}
                  .
                </Box>
              </Typography>
            </Question>
          </Box>
        </Box>
      </Box>

      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={1}
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
