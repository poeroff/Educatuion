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
import { L01C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const pageNumber = 'P03';
  const pageKey = 'p03';
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
      content: <Typography useGap={false} usePre>{`Let’s think about ways we can support the well-being of animals.`}</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L01/C03/A03/HE2-L01-C03-A03-01-1.mp3',
    },
    {
      type: 'You',
      conversationType: 'speak',
      content: (
        <Typography useGap={false} usePre>
          {`Well, how about `}
          <Input
            name='value5'
            width='540px'
            textAlign='start'
            placeholder=' e.g. making a poster about endangered animals '
            ariaLabel='1번 답란'
            value={cardData[pageKey].answer?.value5}
            onChange={handleInputChangeEvent}
            maxLength={50}
            inputSize='x-small'
            readOnly={cardData[pageKey].isSubmitted}
          />
        </Typography>
      ),
      color: 'var(--color-pink-200)',
    },
    {
      type: 'A',
      conversationType: 'listen',
      content: <Typography useGap={false}>{`That’s a great idea!`}</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L01/C03/A03/HE2-L01-C03-A03-01-3.mp3',
    },
    {
      type: 'You',
      conversationType: 'speak',
      content: (
        <Typography useGap={false}>
          {`I think it’s important to`}
          <Typography useGap={false} usePre style={{ marginTop: '5px' }}>
            <Input
              name='value6'
              width='500px'
              textAlign='start'
              placeholder=' e.g. encourage people to protect animals '
              ariaLabel='2번 답란'
              value={cardData[pageKey].answer?.value6}
              onChange={handleInputChangeEvent}
              maxLength={50}
              inputSize='x-small'
              readOnly={cardData[pageKey].isSubmitted}
            />
          </Typography>
        </Typography>
      ),
      color: 'var(--color-pink-200)',
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
