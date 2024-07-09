import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useCallback, useMemo, useState } from 'react';

export interface IHE02201 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  messageInfo?: React.ReactNode;
  chipButtonInfo: IChipButtonInfo[];
  answer: IChipButtonInfo[];
  showAnswer?: string;
  clickedChipButtons: number[];
  setClickedChipButtons: (clickedChipButtons: number[]) => void;
  isSubmitted: boolean;
  submitAnswer: () => void;
}

const HE02201 = ({
  headerInfo,
  questionInfo,
  audioInfo,
  messageInfo,
  chipButtonInfo,
  answer,
  showAnswer,
  clickedChipButtons,
  setClickedChipButtons,
  isSubmitted,
  submitAnswer,
}: IHE02201) => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const chipButtonOnClick = (index: number) => {
    if (isSubmitted) return;

    let newButtons: number[] = clickedChipButtons;
    if (clickedChipButtons.includes(index)) {
      newButtons = newButtons.filter(value => value !== index);
    } else {
      newButtons = [...newButtons, index];
    }
    setClickedChipButtons(newButtons);
  };

  const resetButtonOnClick = () => {
    if (isSubmitted) return;
    setClickedChipButtons([]);
  };

  const handleSubmit = useCallback(() => {
    if (isSubmitted) {
      setIsShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  }, [isSubmitted, submitAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (isSubmitted) {
      return false;
    }

    return clickedChipButtons.length !== chipButtonInfo.length;
  }, [isSubmitted, clickedChipButtons]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (isShowAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, isShowAnswer]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isShowAnswer ? '답안 닫기' : isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      {messageInfo && <BoxWrap>{messageInfo}</BoxWrap>}

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{showAnswer ? showAnswer : answer.map((value: IChipButtonInfo) => value.text).join(' ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02201;
