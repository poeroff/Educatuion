import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioData,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Recorder,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import React, { useEffect, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { IExample, L02SP05, TL02SP05 } from './store';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 발화',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 말해 봅시다.',
  };

  const pageNumber = 'P01';
  const pageKey = pageNumber.toLowerCase() as 'p01';
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
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP05);
  const pageData = useRecoilValue(pageDataAtom);
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
      examples={cardPageData.examples}
      correctAnswer={cardPageData.correctAnswer}
      translations={cardPageData.translations}
      isSubmitted={cardPageData.isSubmitted}
      onChange={setCardData}
      onSubmit={handleSubmit}
    />
  );
};

export interface IHE01301_2 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  pageKey: keyof TL02SP05;
  subKey?: number;
  audioData?: Record<number, IAudioData | null>;
  examples?: IExample[];
  correctAnswer?: string;
  translations?: string[];
  isSubmitted: boolean;
  onChange: SetterOrUpdater<TL02SP05>;
  onSubmit?: () => void;
}

const RecorderQuestion = ({
  headerInfo,
  questionInfo,
  subKey = 1,
  pageKey,
  audioData,
  examples,
  correctAnswer,
  translations,
  isSubmitted,
  onChange,
  onSubmit,
}: IHE01301_2) => {
  const recordData = audioData?.[subKey];

  const { changeData } = usePageData();
  const recorderRef = useRef<IRecorderRef>(null);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isAnswered = Boolean(recordData && Object.keys(recordData).length > 0);
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const handleCompleteRecord = () => {
    recorderRef.current?.onSubmitRecorderProcess({
      userId,
      mainKey: 1,
      subKey,
      page: String(pageKey),
      cardPath: 'L02/SP05',
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
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안닫기' : '답안보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box vAlign='center' marginTop='20px' textAlign='center' tabIndex={101} flexDirection='column' gap='8px'>
        {examples && examples.map((example, index) => <Typography key={index}>{example?.text}</Typography>)}
      </Box>

      <Box hAlign='center' marginTop='20px'>
        <Recorder
          ref={recorderRef}
          recorderIndex={subKey}
          initialData={recordData}
          readOnly={isSubmitted}
          onSubmit={handleCompleteRecord}
          onRefresh={handleResetRecord}
        />
      </Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'auto'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <AnswerTagBox marginTop={0} label='예시 답안'>
            {correctAnswer}
          </AnswerTagBox>

          {translations && (
            <AnswerTagBox label='해석'>
              {translations.map((translation, index) => (
                <Box key={index} marginTop={index !== 0 ? '20px' : 0}>
                  <Typography key={index} useGap={false}>
                    {translation}
                  </Typography>
                </Box>
              ))}
            </AnswerTagBox>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
  <>
    <Box marginTop={marginTop}>
      <Tag type={ETagLine.GREEN} label={label} />
    </Box>

    <Box marginTop='10px'>
      <Typography size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

export default P01;
