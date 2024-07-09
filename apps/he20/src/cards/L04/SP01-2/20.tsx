import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container, DropZone } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP01_2 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';


const P20 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_2);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');
  const _page = 'P20';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-2/HE2-L04-SP01-2-P20.mp3',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [_page]: {
            ...prev[_page],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[_page].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const chipButtonOnClick = (index: number) => {
    if (cardData[_page].isSubmitted) return;

    const updatedAnswer = cardData[_page].answer.includes(index)
      ? cardData[_page].answer.filter(value => value !== index)
      : [...cardData[_page].answer, index];

    setCardData(prev => ({
      ...prev,
      [_page]: {
        ...prev[_page],
        answer: updatedAnswer,
      },
    }));

    changeData(_page, 1, 1, updatedAnswer);
  };

  const resetButtonOnClick = () => {
    if (cardData[_page].isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      [_page]: {
        ...prev[_page],
        answer: [],
      },
    }));
    changeData(_page, 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = cardData[_page].solution.map((chip, index) => ({
      ...chip,
      isError: cardData[_page].answer.includes(index) && cardData[_page].solution[index].answer !== cardData[_page].answer.indexOf(index),
    }));

    const isCorrectAll = cardData[_page].answer.every((index, idx) => cardData[_page].solution[index].answer === idx);

    setCardData(prev => ({
      ...prev,
      [_page]: {
        ...prev[_page],
        solution: newChipButtonInfo,
        isCorrect: isCorrectAll,
      },
    }));
  }, [cardData[_page].answer]);

  const handleSubmit = useCallback(() => {
    if (cardData[_page].isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, [_page]: { ...prev[_page], isSubmitted: true } }));

      const isCorrectAll = cardData[_page].answer.every((index, idx) => cardData[_page].solution[index].answer === idx);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData[_page].answer,
              isAnswer: true,
              isCorrect: isCorrectAll,
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrectAll);
    }
  }, [cardData[_page].isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData[_page].isSubmitted) {
      return false;
    }

    return cardData[_page].answer.length !== cardData[_page].solution.length;
  }, [cardData[_page].isSubmitted, cardData[_page].answer]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (isAnswerShow) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, isAnswerShow]);

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (cardData[_page].isSubmitted) {
      checkAnswer();
    }
  }, [cardData[_page].isSubmitted]);

  useEffect(() => {
    if (cardData[_page].isSubmitted) {
      setMark(cardData[_page].isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[_page].isSubmitted, cardData[_page].isCorrect]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isAnswerShow ? '답안 닫기' : cardData[_page].isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='20px' useRound background='white' padding='10px'>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex'>
            <Label value='B' type='paint' background='var(--color-blue-100)' />
            <Typography>AI just copies human works of art based on big data. I </Typography>

          </Box>
          <Box marginLeft={'50px'}>
            <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)'></Typography>.
          </Box>

        </Box>
      </Box>

      <DropZone
        chipButtonInfo={cardData[_page].solution}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData[_page].answer}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>don’t think AI will ever take the place of human artists</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>B: AI는 빅데이터를 기반으로 인간의 예술작품을 모방할 뿐이죠. AI가 인간 예술가를 대신할 수는 없다고 생각합니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P20;
