import { BottomSheet, Box, EStyleButtonTypes, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import React, { useState } from 'react';

export interface IEM03801 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  questionNode: React.ReactNode;
  solutionNode?: React.ReactNode;
  isAnswered?: boolean;
  isCorrect?: boolean;
  isSubmitted: boolean;
  onSubmit?: () => void;
}

const EM03801 = ({ questionNode, solutionNode, headerInfo, questionInfo, isAnswered, isSubmitted, isCorrect, onSubmit }: IEM03801) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : isSubmitAvailable
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      onSubmit?.();
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      useRound
      bodyId='container'
      vAlign={'flex-start'}
      background={'var(--color-white)'}
      headerInfo={headerInfo}
      questionInfo={{
        mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
        ...questionInfo,
      }}
      submitBtnColor={submitBtnColor}
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box display='flex'>{questionNode}</Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'auto'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          {solutionNode}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM03801;
