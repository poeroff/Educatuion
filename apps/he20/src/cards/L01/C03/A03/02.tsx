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
import { L01C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { ChangeEvent, useEffect } from 'react';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const cardPath = 'L01/C03/A03';
  const subjectCode = 'HE20';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A03);
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
    text: 'Write and talk about what you can do for animals’ well-being.',
  };

  const exampleData: IExampleAndAnswerInfoProps = {
    title: 'Activities and Reasons',
    color: 'pink',
    data: [
      {
        type: 'A',
        content: (
          <Question type='dot' size='small'>
            <Typography useGap={false} usePre>
              {`How about `}
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`volunteering at an animal shelter`}
              </Typography>
              {`?`}
            </Typography>
          </Question>
        ),
      },
      {
        type: 'B',
        content: (
          <Box alignItems='start' vAlign='flex-start' hAlign='flex-start'>
            <Typography useGap={false} usePre style={{ marginLeft: '25px' }}>
              {`I think it’s important to `}
              <Typography useGap={false} usePre weight={'var(--font-weight-bold)'}>
                {`take good care of animals in need`}
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
        type: 'A',
        content: (
          <Box vAlign='flex-start'>
            <Question type={'dot'} size='small'>
              How about
              <Input
                name='value1'
                width='550px'
                textAlign='start'
                placeholder=' e.g. making a poster about endangered animals '
                ariaLabel='1번 답란'
                value={cardData[pageKey].answer?.value1}
                onChange={handleInputChangeEvent}
                maxLength={50}
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
        type: 'B',
        content: (
          <Box alignItems='start' vAlign='flex-start' hAlign='right'>
            <Question type='text' size='small'>
              I think it’s important to
              <Input
                name='value2'
                width='570px'
                textAlign='start'
                placeholder=' e.g. encourage people to protect animals '
                ariaLabel='2번 답란'
                value={cardData[pageKey].answer?.value2}
                onChange={handleInputChangeEvent}
                maxLength={45}
                marginLeft={20}
                inputSize='x-small'
                readOnly={cardData[pageKey].isSubmitted}
              />
              .
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
