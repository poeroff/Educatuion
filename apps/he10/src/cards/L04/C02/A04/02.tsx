import {
  TMainHeaderInfoTypes,
  Input,
  Box,
  Typography,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
  Question,
} from '@maidt-cntn/ui';
import HE03101, { IExampleAndAnswerInfoProps } from '@maidt-cntn/pages/HE-031-01-API';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L04C02A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { ChangeEvent, useEffect } from 'react';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const cardPath = 'L04/C02/A04';
  const subjectCode = 'HE10';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const recorderProcessInfo: IRecordRefSubmitFunctionProps[] = [
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 1,
      userId,
      setFunction: setCardData,
    },
  ];

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
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value1,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value2,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = truncateToMaxBytes(e.target.value);
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')) + 1, value);
  };

  const submitAnswer = () => {
    if (!cardData[pageKey].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];

      if (pageData.find(value => value.page === pageNumber)) {
        userSubmission[0].inputData = pageData.find(value => value.page === pageNumber)!.userSubmission[0].inputData;
      }
      submitData(pageNumber, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          subjectCode: subjectCode,
          originCardData: cardData[pageKey]?.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            audioData: newAudioData,
            answer: {
              value1: userSubmissionList[0].inputData[1]?.value || cardData[pageKey]?.answer?.value1,
              value2: userSubmissionList[0].inputData[2]?.value || cardData[pageKey]?.answer?.value2,
            },
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write and talk about environmental problems that worry you.',
  };

  const exampleData: IExampleAndAnswerInfoProps = {
    title: "My Worry and it's Reason",
    data: [
      {
        content: (
          <Question type='dot' size='small'>
            <Typography useGap={false} usePre>
              {`I'm worried about `}
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`turtles in the ocean`}
              </Typography>
              {`.`}
            </Typography>
          </Question>
        ),
      },
      {
        content: (
          <Box alignItems='start' vAlign='flex-start' hAlign='flex-start'>
            <Typography useGap={false} usePre style={{ marginLeft: '25px' }}>
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`They’re suffering because of plastic waste`}
              </Typography>
              {`.`}
            </Typography>
          </Box>
        ),
      },
    ],
  };
  const answerData: IExampleAndAnswerInfoProps = {
    data: [
      {
        content: (
          <Box vAlign='flex-start'>
            <Question type={'dot'} size='small'>
              I'm worried about
            </Question>
            <Box marginTop='0px'>
              <Input
                name='value1'
                width='550px'
                textAlign='start'
                placeholder=' e.g. polar bears in the Arctic '
                ariaLabel='1번 답란'
                value={cardData[pageKey].answer?.value1}
                onChange={handleInputChangeEvent}
                maxLength={50}
                marginLeft={20}
                inputSize='x-small'
                readOnly={cardData[pageKey].isSubmitted}
              />
            </Box>
          </Box>
        ),
      },
      {
        type: 'B',
        content: (
          <Box alignItems='start' vAlign='flex-start' paddingTop='12px'>
            <Input
              name='value2'
              width='610px'
              textAlign='start'
              placeholder=' e.g. They’re losing their homes due to global warming. '
              ariaLabel='2번 답란'
              value={cardData[pageKey].answer?.value2}
              onChange={handleInputChangeEvent}
              maxLength={60}
              marginLeft={20}
              inputSize='x-small'
              readOnly={cardData[pageKey].isSubmitted}
            />
          </Box>
        ),
      },
    ],
  };

  return (
    <HE03101
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      exampleData={exampleData}
      answerData={answerData}
      audioData={cardData[pageKey].audioData}
      recorderProcessInfo={recorderProcessInfo}
      inputs={cardData[pageKey]?.answer || {}}
      onSubmit={submitAnswer}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P02;
