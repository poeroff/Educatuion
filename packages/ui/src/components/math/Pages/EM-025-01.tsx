import { BottomSheet, Box, EStyleButtonTypes, IQuestionProps, Image, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import React, { useState } from 'react';

export interface IEM02501 {
  info?: IEM02501Info;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  questionNode?: React.ReactNode;
  solutionNode?: React.ReactNode;
  isAnswered?: boolean;
  isCorrect?: boolean;
  isSubmitted: boolean;
  onSubmit?: () => void;
}

export interface IEM02501Info {
  imageSrc: string;
  imageAlt: string;
  imageWidth?: string;
  imageHeight?: string;
  imagePadding?: string | number;
}

const EM02501 = ({ info, headerInfo, questionInfo, questionNode, solutionNode, isAnswered, isSubmitted, isCorrect, onSubmit }: IEM02501) => {
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
      <Box useFull vAlign='center' flexDirection='column'>
        {info?.imageSrc && (
          <Box type='line' padding={info.imagePadding || '20px 40px'} useRound>
            <Image src={info?.imageSrc} alt={info?.imageAlt} width={info?.imageWidth} height={info?.imageHeight} />
          </Box>
        )}

        {questionNode}
      </Box>

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

export default EM02501;
