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
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import useCardData from '../hooks/useCardData';

interface IHE01401 {
  headerText: string;
  questionText: React.ReactNode;
  word: string;
  pageNum: string;
  choices?: string[];
  answer: string;
}

const HE03701_SP03_2 = ({ pageNum, headerText, questionText, word, choices, answer }: IHE01401) => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { cardData, changeCardData, getDefaultSubmission, makeUserSubmission } = useCardData(pageNum);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(cardData.isSubmitted);
  const [selectedIndex, setSelectedIndex] = useState<number>(cardData.userAnswer as number);
  const [inputValue, setInputValue] = useState<string>(cardData.userAnswer as string);

  const userAnswerRef = useRef(choices ? selectedIndex : inputValue);
  const isSubmittedRef = useRef(isSubmitted);

  const answerIndex = useMemo(() => choices?.findIndex(choice => choice === answer), [answer, choices]);

  const isCorrect: boolean = useMemo(() => {
    let result;
    if (choices) {
      result = selectedIndex === answerIndex;
    } else {
      result = inputValue === answer;
    }
    return result;
  }, [isSubmitted, selectedIndex, inputValue]);

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
      markSize: 'middle',
      mark: getMarking(isSubmitted, isCorrect),
    }),
    [isSubmitted, isCorrect],
  );

  const handleSubmit = useCallback(() => {
    if (isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      let isCorrect;
      let userAnswer;
      if (choices) {
        isCorrect = selectedIndex === answerIndex;
        userAnswer = selectedIndex;
      } else {
        userAnswer = inputValue.trim().toLowerCase();
        isCorrect = isAnswer(userAnswer, answer);
        setInputValue(userAnswer);
      }

      setIsSubmitted(true);
      submitDataWithResult(pageNum, makeUserSubmission(userAnswer, isCorrect), isCorrect);
    }
  }, [selectedIndex, isSubmitted, inputValue]);

  const handleRadioClick = useCallback((index: number) => {
    setSelectedIndex(index);

    changeData(pageNum, 1, 1, index);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);

    changeData(pageNum, 1, 1, value);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const { value } = userSubmissionList[0].inputData[0];
        if (choices) {
          setSelectedIndex(prev => (value > -1 ? value : prev));
        } else {
          setInputValue(prev => (value ? value : prev));
        }
        setIsSubmitted(isSubmitted);
      }
      initData(pageNum, userSubmissionList, getDefaultSubmission(), isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    userAnswerRef.current = choices ? selectedIndex : inputValue;
  }, [selectedIndex, inputValue]);

  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  useEffect(() => {
    return () => {
      saveData(pageNum);
      changeCardData(userAnswerRef.current, isSubmittedRef.current);
    };
  }, []);

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
      <Box useFull flexDirection='column' hAlign='center' gap='49px'>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
            {word}
          </Typography>
        </Box>
        <BoxWrap>
          {choices ? (
            choices.map((value, index) => (
              <Box key={`${selectedIndex}_${index}`} flex='1' textAlign='center'>
                <Radio
                  type={'box'}
                  align='vertical'
                  label={value}
                  ariaLabel={value}
                  onClick={() => handleRadioClick(index)}
                  isError={isSubmitted && selectedIndex !== answerIndex}
                  readOnly={isSubmitted}
                  value={index === selectedIndex}
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
                status={inputValue ? (isSubmitted && !isAnswer(inputValue, answer) ? InputStatus.ERROR : InputStatus.ENABLE) : InputStatus.DEFAULT}
                onChange={e => handleInputChange(e.target.value)}
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

export default HE03701_SP03_2;
