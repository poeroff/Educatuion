import {
  TMainHeaderInfoTypes,
  Question,
  Input,
  Label,
  Typography,
  InputStatus,
  Box,
  IQuestionProps,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { ChangeEvent, useEffect } from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { pageDataAtom } from '@/stores/page';
import HE03101 from '@maidt-cntn/pages/HE-031-01-API';

interface IExampleAndAnswerInfoProps {
  title: string;
  data: IExampleAndAnswerData[];
}
interface IExampleAndAnswerData {
  type: string;
  content: React.ReactNode;
}

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const cardPath = 'L02/C03/A03';
  const subjectCode = 'HE20';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A03);
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
    headerText: 'Your Turn (Step 2)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write and talk about a new place that you were satisfied or dissatisfied with.',
  };
  const exampleData: IExampleAndAnswerInfoProps = {
    title: 'New Places',
    data: [
      {
        type: 'A',
        content: (
          <Box display='flex' gap='7px' paddingTop='1px' vAlign='center'>
            <Label type='line' value='A' />
            <Typography useGap={false}>{`Have you visited the new `}</Typography>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              {`swimming pool`}
            </Typography>
            <Typography>{` in our town?`}</Typography>
          </Box>
        ),
      },
      {
        type: 'B',
        content: (
          <Box display='flex' gap='7px' vAlign='center' alignItems='start'>
            <Label type='line' value='B' />
            <Typography useGap={false}>
              {`I was pretty satisfied with it. `}{' '}
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                The water was so clean.
              </Typography>
              <Typography useGap={false}>
                {`I wasn’t that satisfied with it. `}
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                  The lockers were too small.
                </Typography>
              </Typography>
            </Typography>
          </Box>
        ),
      },
    ],
  };

  const answerData: IExampleAndAnswerInfoProps = {
    title: 'New Places',
    data: [
      {
        type: '',
        content: (
          <Typography useGap={false}>
            <Question type={'dot'} size='small'>
              {`I was pretty satisfied with it. `}
              <Input
                placeholder='e.g. It has exciting slides.'
                ariaLabel='1번 답란'
                width='310px'
                maxLength={50}
                name={'value1'}
                inputSize='x-small'
                value={cardData[pageKey]?.answer?.value1}
                readOnly={cardData[pageKey].isSubmitted}
                status={
                  cardData[pageKey].isSubmitted
                    ? InputStatus.ENABLE
                    : isNotEmptyString(cardData[pageKey]?.answer?.value1 ?? '')
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                onChange={handleInputChangeEvent}
              />
              .
            </Question>
            <Typography>
              {`I wasn’t that satisfied with it. `}
              <Input
                placeholder='e.g. It was too crowded.'
                ariaLabel='2번 답란'
                minWidth='310px'
                maxLength={50}
                name={'value2'}
                inputSize='x-small'
                value={cardData[pageKey]?.answer?.value2}
                readOnly={cardData[pageKey].isSubmitted}
                status={
                  cardData[pageKey].isSubmitted
                    ? InputStatus.ENABLE
                    : isNotEmptyString(cardData[pageKey]?.answer?.value2 ?? '')
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                onChange={handleInputChangeEvent}
              />
              .
            </Typography>
          </Typography>
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
