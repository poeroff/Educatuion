import {
  TMainHeaderInfoTypes,
  Typography,
  Input,
  IRecordRefSubmitFunctionProps,
  IUploadRecordData,
  makeAudioData,
  InputStatus,
} from '@maidt-cntn/ui';
import HE09001, { IListenAndAnswer } from '@maidt-cntn/pages/HE-009-01-API';
import { ChangeEvent, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L04C03A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const pageNumber = 'P03';
  const pageKey = 'p03';
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
      subKey: 2,
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
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value4,
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: cardData[pageKey]?.answer?.value5,
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

  const handleListeningEnd = (subkey: number) => {
    const userInputs = [...(cardData[pageKey].listeningData || [])];
    userInputs[(subkey - 1) / 2] = true;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listeningData: userInputs,
      },
    }));
    changeData(pageNumber, 1, subkey, true);
  };

  const submitAnswer = () => {
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
                value4: userSubmissionList[0].inputData[3]?.value,
                value5: userSubmissionList[0].inputData[4]?.value,
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
        <Typography useGap={false} usePre>
          {`Do you have any ideas for upcycling `}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            {`a tire`}
          </Typography>
          {`?`}
        </Typography>
      ),
      color: 'var(--color-blue-100)',
      audioSrc: '/L04/C03/A03/HE1-L04-C03-A03-01-1.mp3',
    },
    {
      type: 'You',
      conversationType: 'speak',
      content: (
        <Typography useGap={false} usePre>
          {`Why don’t you turn it into `}
          <Input
            name='value4'
            width='280px'
            textAlign='start'
            placeholder=' e.g. a flower pot '
            ariaLabel='1번 답란'
            value={cardData[pageKey].answer?.value4}
            onChange={handleInputChangeEvent}
            maxLength={33}
            inputSize='x-small'
            status={
              cardData[pageKey].isSubmitted
                ? InputStatus.ENABLE
                : isNotEmptyString(cardData[pageKey]?.answer?.value5 ?? '')
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[pageKey].isSubmitted}
          />
          {`?\n You can `}
          <Typography useGap={false} usePre style={{ marginTop: '5px' }}>
            <Input
              name='value5'
              width='500px'
              textAlign='start'
              placeholder=' e.g. fill the tire up with soil and plant flowers '
              ariaLabel='2번 답란'
              value={cardData[pageKey].answer?.value5}
              onChange={handleInputChangeEvent}
              maxLength={50}
              inputSize='x-small'
              status={
                cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey]?.answer?.value5 ?? '')
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              readOnly={cardData[pageKey].isSubmitted}
            />
          </Typography>
          {`.`}
        </Typography>
      ),
      color: 'var(--color-pink-200)',
    },
    {
      type: 'A',
      conversationType: 'listen',
      content: <Typography useGap={false}>{`That’s a great idea!`}</Typography>,
      color: 'var(--color-blue-100)',
      audioSrc: '/L04/C03/A03/HE1-L04-C03-A03-01-3.mp3',
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
