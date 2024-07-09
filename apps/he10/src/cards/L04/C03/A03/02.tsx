import {
  TMainHeaderInfoTypes,
  Input,
  Box,
  Typography,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
  Label,
  Question,
} from '@maidt-cntn/ui';
import HE03101, { IExampleAndAnswerInfoProps } from '@maidt-cntn/pages/HE-031-01-API';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L04C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { ChangeEvent, useEffect } from 'react';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const cardPath = 'L04/C03/A03';
  const subjectCode = 'HE10';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A03);
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
    const value = e.target.value;
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
    headerText: 'Your Turn (Step 2)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write and talk about ways to upcycle used items.',
  };

  const exampleData: IExampleAndAnswerInfoProps = {
    title: 'Ways to Upcycle Used Items',
    color: 'green',
    data: [
      {
        type: 'A',
        content: (
          <Box display='flex' paddingTop='12px'>
            <Label background='' type='line' value='A' />
            <Typography useGap={false} usePre style={{ marginLeft: '12px' }}>
              {`Do you have any ideas for upcycling `}
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`a tire`}
              </Typography>
              {`?`}
            </Typography>
          </Box>
        ),
      },
      {
        type: 'B',
        content: (
          <Box alignItems='start' display='flex'>
            <Label background='' type='line' value='B' />
            <Typography useGap={false} usePre style={{ marginLeft: '12px' }}>
              {`Why don’t you turn it into `}
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`a swing`}
              </Typography>
              {`?\n You can `}
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`paint the tire and hang it from a tree`}
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
              Why don’t you turn it into
              <Input
                name='value1'
                width='420px'
                textAlign='start'
                placeholder=' e.g. a flower pot '
                ariaLabel='1번 답란'
                value={cardData[pageKey].answer?.value1}
                onChange={handleInputChangeEvent}
                maxLength={40}
                marginLeft={20}
                inputSize='x-small'
                readOnly={cardData[pageKey].isSubmitted}
              />
              ?
            </Question>
          </Box>
        ),
      },
      {
        content: (
          <Box alignItems='start' vAlign='flex-start' hAlign='right'>
            <Question type='text' size='small'>
              You can
              <Input
                name='value2'
                width='750px'
                textAlign='start'
                placeholder=' e.g. fill the tire up with soil and plant flowers '
                ariaLabel='2번 답란'
                value={cardData[pageKey].answer?.value2}
                onChange={handleInputChangeEvent}
                maxLength={65}
                marginLeft={20}
                inputSize='x-small'
                readOnly={cardData[pageKey].isSubmitted}
              />
            </Question>
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
