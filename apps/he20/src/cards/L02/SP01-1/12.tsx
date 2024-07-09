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
import { L02SP01_1 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface pageType {
  _page?: string;
}

const P12 = ({ _page = 'P12' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_1);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P12.mp3',
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
          p12: {
            ...prev.p12,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p12.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const chipButtonOnClick = (index: number) => {
    if (cardData.p12.isSubmitted) return;

    const updatedAnswer = cardData.p12.answer.includes(index)
      ? cardData.p12.answer.filter(value => value !== index)
      : [...cardData.p12.answer, index];

    setCardData(prev => ({
      ...prev,
      p12: {
        ...prev.p12,
        answer: updatedAnswer,
      },
    }));

    changeData(_page, 1, 1, updatedAnswer);
  };

  const resetButtonOnClick = () => {
    if (cardData.p12.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p12: {
        ...prev.p12,
        answer: [],
      },
    }));
    changeData(_page, 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = cardData.p12.solution.map((chip, index) => ({
      ...chip,
      isError: cardData.p12.answer.includes(index) && cardData.p12.solution[index].answer !== cardData.p12.answer.indexOf(index),
    }));

    const isCorrectAll = cardData.p12.answer.every((index, idx) => cardData.p12.solution[index].answer === idx);

    setCardData(prev => ({
      ...prev,
      p12: {
        ...prev.p12,
        solution: newChipButtonInfo,
        isCorrect: isCorrectAll,
      },
    }));
  }, [cardData.p12.answer]);

  const handleSubmit = useCallback(() => {
    if (cardData.p12.isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true } }));

      const isCorrectAll = cardData.p12.answer.every((index, idx) => cardData.p12.solution[index].answer === idx);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p12.answer,
              isAnswer: true,
              isCorrect: isCorrectAll,
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrectAll);
    }
  }, [cardData.p12.isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p12.isSubmitted) {
      return false;
    }

    return cardData.p12.answer.length !== cardData.p12.solution.length;
  }, [cardData.p12.isSubmitted, cardData.p12.answer]);

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
    if (cardData.p12.isSubmitted) {
      checkAnswer();
    }
  }, [cardData.p12.isSubmitted]);

  useEffect(() => {
    if (cardData.p12.isSubmitted) {
      setMark(cardData.p12.isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p12.isSubmitted, cardData.p12.isCorrect]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isAnswerShow ? '답안 닫기' : cardData.p12.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='20px' useRound background='white' padding='10px'>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex'>
            <Label value='G' type='paint' background='var(--color-blue-100)' />
            <Typography>
              Yes, I did, but I ended up buying this really cool T-shirt because it was half price. I’m really satisfied with the deal.
            </Typography>
          </Box>

          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>I don’t think</Typography>
              <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)'></Typography>.
              <Typography>just because they’re on sale.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <DropZone
        chipButtonInfo={cardData.p12.solution}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p12.answer}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>it’s very wise to buy things</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>여: 네, 받았어요, 그런데 반값이라서 이 멋진 티셔츠를 사게 됐어요. 저는 그 거래에 정말 만족해요.</Typography>
            <Typography>남: 세일 중이라는 이유만으로 물건을 사는 것은 별로 현명하지 못한 것 같아.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
