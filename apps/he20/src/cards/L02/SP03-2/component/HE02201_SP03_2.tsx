import { Box, TMainHeaderInfoTypes, Typography, Scroll, BottomSheet, Tag, ETagLine, EStyleButtonTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission } from '@maidt-cntn/api';
import useCardData from '../hooks/useCardData';

interface IHE02201_SP03_2 {
  pageNum: string;
  answer: string[];
  sentence?: {
    kr: string;
    en: string[];
  };
  chipButtonTexts: IChipButtonInfo[];
}

const HE02201_SP03_2 = ({ pageNum, answer, sentence, chipButtonTexts }: IHE02201_SP03_2) => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { cardData, changeCardData, getDefaultSubmission, makeUserSubmission } = useCardData(pageNum);

  const [showAnswer, setShowAnswer] = useState(false);
  const [chipButtonInfo, setChipButtonInfo] = useState(chipButtonTexts);
  const [isSubmitted, setIsSubmitted] = useState(cardData.isSubmitted);
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>(cardData.userAnswer as number[]);

  const userAnswerRef = useRef(clickedChipButtons);
  const isSubmittedRef = useRef(isSubmitted);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 영작 연습',
    headerPattern: 'text',
  };

  const checkAnswer = () => {
    const userAnswerStr = clickedChipButtons
      .map(v => chipButtonInfo[v])
      .map(v => v.text)
      .join(' ');

    const isCorrect = isAnswer(userAnswerStr, answer.join(' '));
    return isCorrect;
  };

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
      markSize: 'middle',
      mark: getMarking(isSubmitted, checkAnswer()),
    }),
    [isSubmitted],
  );

  const setErrorButtonInfo = () => {
    const chipbutton = chipButtonInfo;

    clickedChipButtons.forEach((v, index) => {
      const temp = chipbutton[v];
      if (temp.text !== answer[index]) {
        temp.isError = true;
      }
    });
    setChipButtonInfo(chipbutton);
  };

  const chipButtonOnClick = (index: number) => {
    let data;
    if (clickedChipButtons.includes(index)) {
      data = [...clickedChipButtons].filter(value => value !== index);
    } else {
      data = [...clickedChipButtons, index];
    }
    setClickedChipButtons(data);
  };

  const resetButtonOnClick = () => {
    setClickedChipButtons([]);
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = checkAnswer();

      if (!isCorrect) {
        setErrorButtonInfo();
      }

      setIsSubmitted(!isSubmitted);

      submitDataWithResult(pageNum, makeUserSubmission([...clickedChipButtons], isCorrect), isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        const { inputData, isCorrect } = userSubmissionList[0];
        setClickedChipButtons(inputData?.[0].value);

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
    if (isSubmitted) {
      setErrorButtonInfo();
    }

    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  useEffect(() => {
    userAnswerRef.current = clickedChipButtons;
    changeData(pageNum, 1, 1, userAnswerRef.current);
  }, [clickedChipButtons]);

  useEffect(() => {
    return () => {
      changeCardData(userAnswerRef.current, isSubmittedRef.current);
      saveData(pageNum);
    };
  }, []);

  const isSubmitDisabled = useMemo(() => {
    if (isSubmitted) {
      return false;
    }

    return clickedChipButtons.length !== chipButtonInfo?.length;
  }, [isSubmitted, clickedChipButtons]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  const isCompleted: boolean = useMemo(() => {
    if (isSubmitted) return true;
    return false;
  }, [isSubmitted]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={showAnswer ? '답안 닫기' : isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Typography lineHeight='42px'>{sentence?.kr}</Typography>
          </Box>
        </Scroll>
      </Box>

      <Box hAlign='center' marginBottom='24px'>
        <Typography>
          {sentence?.en.map((v, index) =>
            v !== '' ? v : <Typography key={index} type='blank' width='200px' title='빈칸' boxColor='var(--color-black)' />,
          )}
        </Typography>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={isCompleted}
      />

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answer.join(' ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02201_SP03_2;
