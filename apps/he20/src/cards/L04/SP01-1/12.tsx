import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
  Scroll,
} from '@maidt-cntn/ui';
import { Container, DropZone } from '@maidt-cntn/ui/en';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP01_1 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P12 = ({ _page = 'P12' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_1);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '음원을 듣고 단어를 알맞게 배열하여 빈칸에 들어갈 문장을 완성해 봅시다. ',
    mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P12.mp3',
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
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P12: {
            ...prev.P12,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P12.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const chipButtonOnClick = (index: number) => {
    if (cardData.P12.isSubmitted) return;

    const updatedAnswer = cardData.P12.answer.includes(index)
      ? cardData.P12.answer.filter(value => value !== index)
      : [...cardData.P12.answer, index];

    setCardData(prev => ({
      ...prev,
      P12: {
        ...prev.P12,
        answer: updatedAnswer,
      },
    }));

    changeData(_page.toUpperCase(), 1, 1, updatedAnswer);
  };

  const resetButtonOnClick = () => {
    if (cardData.P12.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      P12: {
        ...prev.P12,
        answer: [],
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = cardData.P12.solution.map((chip, index) => ({
      ...chip,
      isError: cardData.P12.answer.includes(index) && cardData.P12.solution[index].answer !== cardData.P12.answer.indexOf(index),
    }));

    const isCorrectAll = cardData.P12.answer.every((index, idx) => cardData.P12.solution[index].answer === idx);

    setCardData(prev => ({
      ...prev,
      P12: {
        ...prev.P12,
        solution: newChipButtonInfo,
        isCorrect: isCorrectAll,
      },
    }));
  }, [cardData.P12.answer]);

  const handleSubmit = useCallback(() => {
    if (cardData.P12.isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, P12: { ...prev.P12, isSubmitted: true } }));

      const isCorrectAll = cardData.P12.answer.every((index, idx) => cardData.P12.solution[index].answer === idx);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.P12.answer,
              isAnswer: true,
              isCorrect: isCorrectAll,
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrectAll);
    }
  }, [cardData.P12.isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.P12.isSubmitted) {
      return false;
    }

    return cardData.P12.answer.length !== cardData.P12.solution.length;
  }, [cardData.P12.isSubmitted, cardData.P12.answer]);

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
      saveData(_page.toUpperCase());
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (cardData.P12.isSubmitted) {
      checkAnswer();
    }
  }, [cardData.P12.isSubmitted]);

  useEffect(() => {
    if (cardData.P12.isSubmitted) {
      setMark(cardData.P12.isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.P12.isSubmitted, cardData.P12.isCorrect]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isAnswerShow ? '답안 닫기' : cardData.P12.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-yellow-100)' marginRight={8} />
            </Box>
            <Box>
              <Box>
                <Typography>They have built-in Bluetooth headphones and microphones,</Typography>
              </Box>
              <Box>
                <Typography>so you can listen to music and make phone calls.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex' paddingTop={10}>
            <Box>
              <Label value='M' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Box>
              <Box>
                <Typography>Sounds amazing!</Typography>
                <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)'></Typography>
                <Typography>?</Typography>
              </Box>
            </Box>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        chipButtonInfo={cardData.P12.solution}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.P12.answer}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>Can you show me how to use them</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>여: 블루투스 헤드폰과 마이크가 내장되어 있어서 음악을 듣거나 전화를 걸 수 있어.</Typography>
            <Typography>남: 엄청난데! 어떻게 쓰는 건지 보여 줄 수 있어?</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
