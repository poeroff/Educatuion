import {
  Box,
  BoxWrap,
  Input,
  Recorder,
  TMainHeaderInfoTypes,
  Typography,
  Label,
  IRecorderRef,
  EStyleButtonTypes,
  IUploadRecordData,
  IAudioData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { ExampleBox } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/en';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L01C02A04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { fulfillWithTimeLimit, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

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

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A04);

  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const pageKey = 'p02';
  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
  };

  const questionInfo = {
    text: 'Write and talk about the type of volunteer work you plan to do.',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
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

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData[pageKey].answer?.map((ans, idx) => (idx === index ? truncateToMaxBytes(value) : ans));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: updatedAnswers,
      },
    }));
    changeData(pageNo, 1, 1, updatedAnswers);
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answer,
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
    return cardData[pageKey].answer?.some(val => val === '') || Object.values(cardData[pageKey].audioData!).length !== 1;
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/C02/A04',
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
      submitBtnColor={cardData[pageKey].isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData[pageKey].isSubmitted || checkDisableInput()}
    >
      <Box hAlign='center' marginTop={10}>
        <Box flexDirection='column' hAlign='center' vAlign='flex-start'>
          <Box width='829px'>
            <ExampleBox color='green' title="My Plans and My Partner's">
              <Content>
                <Wrap>
                  <Box>
                    <Label background='' type='line' value='A' />
                  </Box>
                  <Box>
                    <Typography useGap={false}>I'm thinking of</Typography>{' '}
                    <Typography useGap={false} weight='var(--font-weight-extraBold)'>
                      {' '}
                      picking up trash in the park.
                    </Typography>
                  </Box>
                </Wrap>
                <Wrap>
                  <Box>
                    <Label background='' type='line' value='B' />
                  </Box>
                  <Box>
                    <Typography useGap={false}> I'm planning to </Typography>{' '}
                    <Typography useGap={false} weight='var(--font-weight-extraBold)'>
                      play the guitar at a nursing home.
                    </Typography>
                  </Box>
                </Wrap>
              </Content>
            </ExampleBox>
          </Box>
          <BoxWrap alignItems={'baseline'} paddingLeft={'14px'} marginTop='16px'>
            <Box vAlign='baseline' flex='auto'>
              <Box>
                <Label value={'A'} type={'line'} />
              </Box>
              <Typography>
                I'm thinking of
                <Input
                  width='460px'
                  ariaLabel='A의 답 입력란'
                  placeholder='e.g. teaching English to children'
                  value={cardData[pageKey].answer?.[0]}
                  onChange={e => handleInputChange(0, e.target.value)}
                  maxLength={2000}
                  marginLeft={20}
                  inputSize='x-small'
                  readOnly={cardData[pageKey].isSubmitted}
                />
              </Typography>
            </Box>
          </BoxWrap>
          <BoxWrap alignItems={'baseline'} paddingLeft={'14px'} marginTop='16px'>
            <Box vAlign='baseline' flex='auto'>
              <Box>
                <Label value={'B'} type={'line'} />
              </Box>
              <Typography>
                I'm planning to
                <Input
                  width='460px'
                  ariaLabel='B의 답 입력란'
                  placeholder='e.g. read books for the elderly'
                  value={cardData[pageKey].answer?.[1]}
                  onChange={e => handleInputChange(1, e.target.value)}
                  maxLength={2000}
                  marginLeft={20}
                  inputSize='x-small'
                  readOnly={cardData[pageKey].isSubmitted}
                />
              </Typography>
            </Box>
          </BoxWrap>
        </Box>
      </Box>
      <BoxWrap justifyContent='center' marginTop='20px'>
        <Recorder
          recorderIndex={1}
          initialData={cardData[pageKey].audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          readOnly={cardData[pageKey].isSubmitted}
          ref={recorderRef}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;

const Wrap = styled.div`
  display: flex;
  gap: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
`;
