import {
  TMainHeaderInfoTypes,
  Input,
  Box,
  Typography,
  IQuestionProps,
  InputStatus,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
  Label,
} from '@maidt-cntn/ui';
import HE03101, { IExampleAndAnswerInfoProps } from '@maidt-cntn/pages/HE-031-01-API';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L02C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { ChangeEvent, useEffect } from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const cardPath = 'L02/C03/A03';
  const subjectCode = 'HE10';

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
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write and talk about what you should not do in the following countries.',
  };
  const exampleData: IExampleAndAnswerInfoProps = {
    title: "Countries and Don'ts",
    data: [
      {
        type: 'A',
        content: (
          <Box display='flex' gap='12px' paddingTop='12px'>
            <Label background='' type='line' value='A' />
            <Typography useGap={false}>Can you tell me what I should be aware of in</Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              Malaysia
            </Typography>
            <Typography useGap={false}>?</Typography>
          </Box>
        ),
      },
      {
        type: 'B',
        content: (
          <Box display='flex' gap='12px' paddingTop='12px'>
            <Label type='line' value='B' />
            <Typography useGap={false}>When you go there, make sure not to</Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              point with your index finger
            </Typography>
            <Typography useGap={false}>.</Typography>
          </Box>
        ),
      },
    ],
  };
  const answerData: IExampleAndAnswerInfoProps = {
    title: "Countries and Don'ts",
    data: [
      {
        type: 'A',
        content: (
          <Box display='flex' gap='12px' paddingTop='12px'>
            <Label type='line' value='A' />
            <Typography useGap={false}>Can you tell me what I should be aware of in</Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              Malaysia
            </Typography>
            <Typography useGap={false}>?</Typography>
          </Box>
        ),
      },
      {
        type: 'B',
        content: (
          <Box display='flex' gap='12px' paddingTop='12px'>
            <Label type='line' value='B' />
            <Typography useGap={false}>When you go there, make sure not to&nbsp;</Typography>
            <Input
              maxLength={30}
              placeholder='e.g. eat with your left hand'
              minWidth='360px'
              name={'value2'}
              value={cardData[pageKey]?.answer?.value2}
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey]?.answer?.value2 ?? '')
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='When you go there, make sure not to 이후 들어갈 문장(단어)'
              onChange={handleInputChangeEvent}
            />
            <Typography useGap={false}>.</Typography>
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
