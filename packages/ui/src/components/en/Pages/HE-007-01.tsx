import {
  Box,
  TMainHeaderInfoTypes,
  ChipButton,
  EChipButtonType,
  List,
  BoxWrap,
  Question,
  IAudioPlayerProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Textarea,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect, useMemo } from 'react';

interface IData extends IRadioData {
  value: boolean | undefined;
  isCorrect: boolean | undefined;
}

export interface IRadioData {
  contents: string;
  answer: boolean;
}

export interface IHE00701 {
  headerText: string;
  questionText: string;
  audioSrc: string;
  captionSrc: string;
  explanation?: React.ReactNode;
  data: IRadioData[];
}

const HE00701 = ({ headerText, questionText, audioSrc, captionSrc, explanation, data }: IHE00701) => {
  const [isShowAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [list, setList] = useState<IData[]>(
    data.map(item => {
      return {
        ...item,
        value: undefined,
        isCorrect: undefined,
      };
    }),
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: audioSrc,
    captionSrc: captionSrc,
  };

  const handleChipButtonClick = (value: boolean, index: number) => {
    setList(list =>
      list.map((item, idx) => {
        if (idx !== index) return item;

        return {
          ...item,
          value: item.value === value ? undefined : value,
        };
      }),
    );
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      setIsSubmitted(true);
    }

    setList(list =>
      list.map(item => {
        return {
          ...item,
          isCorrect: item.value === item.answer,
        };
      }),
    );
    setIsCorrect(list.every(item => item.isCorrect));
  };

  useEffect(() => {
    if (isSubmitted) {
      setIsCorrect(list.every(item => item.isCorrect === true));
    }
  }, [list, isSubmitted]);

  const isSubmittable = useMemo(() => {
    return list.every(item => item.value !== undefined);
  }, [list]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isSubmittable ? (isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isSubmittable}
      onSubmit={handleSubmit}
    >
      <List data={list}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull key={index}>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box alignContent='center'>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.TRUE}
                  isError={value?.isCorrect !== undefined && !value?.isCorrect}
                  isActive={value?.value === true}
                  isDisabled={isSubmitted}
                  size={'48px'}
                  onClick={() => handleChipButtonClick(true, index - 1)}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.FALSE}
                  isError={value?.isCorrect !== undefined && !value?.isCorrect}
                  isActive={value?.value === false}
                  isDisabled={isSubmitted}
                  size={'48px'}
                  onClick={() => handleChipButtonClick(false, index - 1)}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <BoxWrap>
            {list.map((item, idx) => (
              <Box marginTop='12px' marginLeft='12px' key={idx}>{`(${idx + 1}) ${item.answer ? 'T' : 'F'}`}</Box>
            ))}
          </BoxWrap>
          {explanation && (
            <>
              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해설' />
              </Box>
              {explanation}
            </>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE00701;
