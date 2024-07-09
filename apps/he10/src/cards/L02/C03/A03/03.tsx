import {
  TMainHeaderInfoTypes,
  Typography,
  Box,
  Input,
  InputStatus,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import HE09001, { IListenAndAnswer } from '@maidt-cntn/pages/HE-009-01-API';
import { ChangeEvent, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L02C03A03 } from '@/cards/L02/C03/A03/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const pageNumber = 'P03';
  const pageKey = 'p03';
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
      subKey: 2,
      userId,
      setFunction: setCardData,
    },
    {
      cardPath: cardPath,
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: 4,
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
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: {},
        },
        {
          subKey: 4,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value5,
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value6,
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
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const handleListeningEnd = (subKey: number) => {
    const userInputs = [...(cardData[pageKey].listeningData || [])];
    userInputs[(subKey - 1) / 2] = true;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listeningData: userInputs,
      },
    }));
    changeData(pageNumber, 1, subKey, true);
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
            answer:
              {
                value5: userSubmissionList[0].inputData[4]?.value,
                value6: userSubmissionList[0].inputData[5]?.value,
              } || cardData[pageKey].answer,
            listeningData: [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[2]?.value] || cardData[pageKey].listeningData,
            audioData: newAudioData,
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
    headerText: 'Your Turn (Step 3)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write your own scripts and do a role-play.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      conversationType: 'listen',
      content: (
        <Box>
          <Typography useGap={false}>Can you tell me what I should be aware of in </Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            &nbsp;Malaysia
          </Typography>
          <Typography useGap={false}>?</Typography>
        </Box>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C03/A03/HE1-L02-C03-A03-01-1.mp3',
    },
    {
      type: 'You',
      conversationType: 'speak',
      content: (
        <Box>
          <Typography useGap={false}>Sure. When you go there, make sure not to</Typography>
          <br />
          <Input
            maxLength={50}
            placeholder='e.g. eat with your left hand'
            minWidth='370px'
            name={'value5'}
            value={cardData[pageKey]?.answer?.value5}
            readOnly={cardData[pageKey].isSubmitted}
            status={
              cardData[pageKey].isSubmitted
                ? InputStatus.ENABLE
                : isNotEmptyString(cardData[pageKey]?.answer?.value5 ?? '')
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            ariaLabel='1번 답란'
            onChange={handleInputChangeEvent}
          />
          <Typography useGap={false}>.</Typography>
        </Box>
      ),
      color: 'var(--color-red-300)',
    },
    {
      type: 'A',
      conversationType: 'listen',
      content: (
        <Box>
          <Typography useGap={false}>Why is that?</Typography>
        </Box>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L02/C03/A03/HE1-L02-C03-A03-01-3.mp3',
    },
    {
      type: 'You',
      conversationType: 'speak',
      content: (
        <Box>
          <Typography useGap={false}>It's considered &nbsp;</Typography>
          <Input
            maxLength={30}
            placeholder='e.g. unclean'
            minWidth='200px'
            name={'value6'}
            value={cardData[pageKey]?.answer?.value6}
            readOnly={cardData[pageKey].isSubmitted}
            status={
              cardData[pageKey].isSubmitted
                ? InputStatus.ENABLE
                : isNotEmptyString(cardData[pageKey]?.answer?.value6 ?? '')
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            ariaLabel='2번 답란'
            onChange={handleInputChangeEvent}
          />
          <Typography useGap={false}>&nbsp;in their culture.</Typography>
        </Box>
      ),
      color: 'var(--color-red-300)',
    },
  ];

  return (
    <HE09001
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      data={data}
      listeningData={cardData[pageKey].listeningData}
      audioData={cardData[pageKey].audioData}
      onListeningEnd={handleListeningEnd}
      recorderProcessInfo={recorderProcessInfo}
      onSubmit={submitAnswer}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P03;
