import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useCallback, useMemo, useState } from 'react';

interface IHE01401 {
  headerText: string;
  questionText: React.ReactNode;
  word: string;
  choices?: string[];
  answer: string;
}

const HE03701 = ({ headerText, questionText, word, choices, answer }: IHE01401) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');
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
      text: <Typography fontSize='var(--font-size-32)'>{questionText}</Typography>,
      markSize: 'middle',
      mark,
    }),
    [mark],
  );

  const answerIndex = useMemo(() => choices?.findIndex(choice => choice === answer), [answer, choices]);

  const checkAnswer = useCallback(() => {
    if (choices) {
      setMark(selectedIndex === answerIndex ? 'correct' : 'incorrect');
    } else {
      setMark(inputValue.trim().toLowerCase() === answer ? 'correct' : 'incorrect');
    }
  }, [selectedIndex, answer, inputValue]);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      setIsSubmitted(true);
      checkAnswer();
    }
  }, [isSubmitted, checkAnswer]);

  const handleRadioClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const isSubmitDisabled = useMemo(() => {
    if (isSubmitted) {
      return false;
    }

    if (choices) {
      return selectedIndex === -1;
    } else {
      return !inputValue.trim();
    }
  }, [isSubmitted, selectedIndex, inputValue]);

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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={showAnswer ? '답안 닫기' : isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px' width={920}>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
            {word}
          </Typography>
        </Box>
        <BoxWrap>
          {choices ? (
            choices.map((value, index) => (
              <Box key={index} flex='1' textAlign='center'>
                <Radio
                  type={'box'}
                  align='vertical'
                  label={value}
                  ariaLabel={value}
                  onClick={() => handleRadioClick(index)}
                  isError={isSubmitted && selectedIndex !== answerIndex}
                  readOnly={isSubmitted}
                >
                  {value}
                </Radio>
              </Box>
            ))
          ) : (
            <Box flex='1' textAlign='center'>
              <Input
                placeholder='내용을 넣어 주세요.'
                maxLength={99}
                width='50%'
                status={
                  inputValue.trim()
                    ? isSubmitted && inputValue.trim().toLowerCase() !== answer
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                onChange={e => setInputValue(e.target.value)}
                value={inputValue}
                readOnly={isSubmitted}
                ariaLabel='답 입력란'
              />
            </Box>
          )}
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE03701;
