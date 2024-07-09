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

interface IHE10_L04_SP04_2 {
  pageNum: string;
  answer: string[];
  sentence: string;
  chipButtonTexts: IChipButtonInfo[];
  headerInfo: TMainHeaderInfoTypes;
  question: string;
}

const HE10_L04_SP04_2 = ({ pageNum, answer, sentence, chipButtonTexts, headerInfo, question }: IHE10_L04_SP04_2) => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { cardData, changeCardData, getDefaultSubmission, makeUserSubmission } = useCardData(pageNum);

  const [isShow, setIsShow] = useState(false);
  const [chipButtonInfo, setChipButtonInfo] = useState(chipButtonTexts);
  const [isCorrect, setIsCorrect] = useState<boolean>(cardData.isCorrect);
  const [isSubmitted, setIsSubmitted] = useState(cardData.isSubmitted);
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>(cardData.userAnswer as number[]);

  const userAnswerRef = useRef(clickedChipButtons);
  const isSubmittedRef = useRef(isSubmitted);

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: question,
      markSize: 'middle',
      mark: getMarking(isSubmitted, isCorrect),
    }),
    [isSubmitted, isCorrect],
  );

  const checkAnswer = () => {
    const userAnswerStr = clickedChipButtons
      .map(v => chipButtonInfo[v])
      .map(v => v.text)
      .join(' ');

    const isCorrect = isAnswer(userAnswerStr, answer.join(' '));
    return isCorrect;
  };

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
      setIsShow(!isShow);
    } else {
      const isCorrect = checkAnswer();

      if (!isCorrect) {
        setErrorButtonInfo();
      }

      setIsCorrect(isCorrect);
      setIsSubmitted(!isSubmitted);

      submitDataWithResult(pageNum, makeUserSubmission([...clickedChipButtons], isCorrect), isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const { inputData } = userSubmissionList[0];
        setClickedChipButtons(inputData?.[0].value);
        setIsCorrect(inputData[0].isCorrect);
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
    } else if (isShow) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, isShow]);

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
      submitLabel={isShow ? '답안 닫기' : isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box marginBottom='24px' useRound background='white' padding='10px' hAlign='center'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Typography lineHeight='42px'>{sentence}</Typography>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
        isCompleted={isCompleted}
      />

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>{answer.join(' ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE10_L04_SP04_2;
