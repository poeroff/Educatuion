import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  EStyleButtonTypes,
  IAudioData,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Image,
  Recorder,
  TMainHeaderInfoTypes,
  TextView,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { useEffect, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { L02C08A07, TL02C08A07 } from './store';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
  };
  const questionInfo: IQuestionProps = {
    text: 'Create your own advertisement using the structures below.',
  };

  const pageNumber = 'P02';
  const pageKey = pageNumber.toLowerCase() as 'p02';
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const { initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A07);
  const cardPageData = cardData[pageKey];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardPageData.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,

          [pageKey]: {
            ...prev[pageKey],
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const currentPageState = pageData.find(value => value.page === pageNumber);
    const uploadData = currentPageState?.userSubmission[0].inputData[0].value as IUploadRecordData;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'AUDIO',
            value: uploadData,
          },
        ],
      },
    ];

    submitData(pageNumber, userSubmission);
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

  return (
    <RecorderQuestion
      subKey={1}
      pageKey={pageKey}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioData={cardPageData.audioData}
      isSubmitted={cardPageData.isSubmitted}
      onChange={setCardData}
      onSubmit={handleSubmit}
    />
  );
};

export interface IRecorderQuestion {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  pageKey: keyof TL02C08A07;
  subKey?: number;
  audioData?: Record<number, IAudioData | null>;
  isSubmitted: boolean;
  onChange: SetterOrUpdater<TL02C08A07>;
  onSubmit?: () => void;
}

const RecorderQuestion = ({ headerInfo, questionInfo, subKey = 1, pageKey, audioData, isSubmitted, onChange, onSubmit }: IRecorderQuestion) => {
  const recordData = audioData?.[subKey];

  const { changeData } = usePageData();
  const recorderRef = useRef<IRecorderRef>(null);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isAnswered = recordData && Object.keys(recordData).length > 0;
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitAvailable && !isShowAnswer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;

  const handleCompleteRecord = () => {
    recorderRef.current?.onSubmitRecorderProcess({
      userId,
      mainKey: 1,
      subKey,
      page: String(pageKey),
      cardPath: 'L02/C08/A07',
      subjectCode: 'HE20',
      changeData,
      setFunction: onChange,
    });
  };

  const handleResetRecord = () => {
    changeData(String(pageKey).toUpperCase(), 1, subKey, {});
    onChange(prev => {
      const newCardData = JSON.parse(JSON.stringify(prev));
      newCardData[pageKey].audioData[subKey] = {};
      return newCardData;
    });
  };

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      onSubmit?.();
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={submitBtnColor}
      submitLabel={'완료하기'}
      submitDisabled={isSubmitted || !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box>
        <TextView title='보기'>
          <Image
            src={'/L02/C08/A07/HE2-L02-C08-A07-02.jpg'}
            width={'636px'}
            alt='If you have, then you may have fallen prey to a dark pattern. 빨간 색자로 may have fallen이 강조되어 있고 then 이하가 하늘색 음영으로 강조되어 있다.'
          />
          <Image
            src={'/L02/C08/A07/HE2-L02-C08-A07-03.jpg'}
            width={'636px'}
            alt='Critics suggest that a marketing strategy create value for both companies and customers. 빨간 색자로 suggest가 강조되어 있고 that 이하가 하늘색 음영으로 강조되어 있다. 파란 색자 create는 그 앞의 should가 생략되어 원형임을 나타낸다.'
          />
        </TextView>
      </Box>

      <Box marginTop='50px' display='flex' justifyContent='center'>
        <Box marginLeft='4px'>
          <Recorder
            ref={recorderRef}
            recorderIndex={subKey}
            initialData={recordData}
            readOnly={isSubmitted}
            onSubmit={handleCompleteRecord}
            onRefresh={handleResetRecord}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
