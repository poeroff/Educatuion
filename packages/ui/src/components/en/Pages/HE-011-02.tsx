import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
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
  isSubmitted?: boolean;
  onSubmit?: () => void;
  isSelecting?: boolean;
  children?: React.ReactNode;
}

const HE01102 = ({
  headerText,
  headerInfoProps,
  questionText,
  audioInfo,
  withRecord = false,
  userInputs,
  answers,
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
    [],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: questionText,
      mark,
    }),
    [mark],
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
  }, [isSubmitted, showAnswer, userInputs]);

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
      submitLabel={isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
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
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE01102;
