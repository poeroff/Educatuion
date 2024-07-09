import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Recorder,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface IHE01401 {
  headerText?: string;
  headerInfoProps?: TMainHeaderInfoTypes;
  questionText: React.ReactNode;
  audioInfo?: IAudioPlayerProps;
  withRecord?: boolean;
  userInputs: string[];
  answers: string[];
  explains?: React.ReactNode;
  isSubmitted?: boolean;
  onSubmit?: () => void;
  isSelecting?: boolean;
  children?: React.ReactNode;
}

const L03SP011HE01102 = ({
  headerText,
  headerInfoProps,
  questionText,
  audioInfo,
  withRecord = false,
  userInputs,
  answers,
  explains,
  isSubmitted,
  onSubmit,
  isSelecting,
  children,
}: IHE01401) => {
  const [isRecordSubmitted, setIsRecordSubmitted] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText,
      headerPattern: 'text',
    }),
    [headerText],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: questionText,
      mark,
    }),
    [mark, questionText],
  );

  useEffect(() => {
    if (isSubmitted) {
      const isAllCorrect = userInputs.every((value, idx) => value === answers[idx]);
      setMark(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [isSubmitted, userInputs]);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      onSubmit?.();
    }
  }, [isSubmitted, onSubmit, showAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (isSelecting) {
      return true;
    }
    const isEmptyInputExist = userInputs.some(input => input?.trim() === '');
    return isEmptyInputExist || (withRecord && !isRecordSubmitted);
  }, [userInputs, withRecord, isRecordSubmitted, isSelecting]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfoProps ?? headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={submitBtnColor}
      submitLabel={isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
    >
      {children}
      {withRecord && (
        <Box hAlign='center' marginTop='10px'>
          <Recorder recorderIndex={0} onSubmit={() => setIsRecordSubmitted(true)} />
        </Box>
      )}
      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{answers.join(', ')}</Typography>
          </Box>
          {explains && (
            <>
              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='12px'>
                <Typography size={EStyleFontSizes.MEDIUM} usePre>
                  {explains}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default L03SP011HE01102;
