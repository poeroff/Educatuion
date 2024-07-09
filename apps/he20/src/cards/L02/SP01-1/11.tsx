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

const P11 = ({ _page = 'P11' }: pageType) => {
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
    audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P11.mp3',
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
          p11: {
            ...prev.p11,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p11.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const chipButtonOnClick = (index: number) => {
    if (cardData.p11.isSubmitted) return;

    const updatedAnswer = cardData.p11.answer.includes(index)
      ? cardData.p11.answer.filter(value => value !== index)
      : [...cardData.p11.answer, index];

    setCardData(prev => ({
      ...prev,
      p11: {
        ...prev.p11,
        answer: updatedAnswer,
      },
    }));

    changeData(_page, 1, 1, updatedAnswer);
  };

  const resetButtonOnClick = () => {
    if (cardData.p11.isSubmitted) return;

    setCardData(prev => ({
      ...prev,
      p11: {
        ...prev.p11,
        answer: [],
      },
    }));
    changeData(_page, 1, 1, []);
  };

  const checkAnswer = useCallback(() => {
    const newChipButtonInfo = cardData.p11.solution.map((chip, index) => ({
      ...chip,
      isError: cardData.p11.answer.includes(index) && cardData.p11.solution[index].answer !== cardData.p11.answer.indexOf(index),
    }));

    const isCorrectAll = cardData.p11.answer.every((index, idx) => cardData.p11.solution[index].answer === idx);

    setCardData(prev => ({
      ...prev,
      p11: {
        ...prev.p11,
        solution: newChipButtonInfo,
        isCorrect: isCorrectAll,
      },
    }));
  }, [cardData.p11.answer]);

  const handleSubmit = useCallback(() => {
    if (cardData.p11.isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true } }));

      const isCorrectAll = cardData.p11.answer.every((index, idx) => cardData.p11.solution[index].answer === idx);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p11.answer,
              isAnswer: true,
              isCorrect: isCorrectAll,
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrectAll);
    }
  }, [cardData.p11.isSubmitted, checkAnswer]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData.p11.isSubmitted) {
      return false;
    }

    return cardData.p11.answer.length !== cardData.p11.solution.length;
  }, [cardData.p11.isSubmitted, cardData.p11.answer]);

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
    if (cardData.p11.isSubmitted) {
      checkAnswer();
    }
  }, [cardData.p11.isSubmitted]);

  useEffect(() => {
    if (cardData.p11.isSubmitted) {
      setMark(cardData.p11.isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p11.isSubmitted, cardData.p11.isCorrect]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={isAnswerShow ? '답안 닫기' : cardData.p11.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <Box marginBottom='20px' useRound background='white' padding='10px'>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex'>
            <Label value='W' type='paint' background='var(--color-blue-100)' />
            <Typography>I see. What do you think of these wool sweaters on this stand? They are all loose-fitting.</Typography>
          </Box>

          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>Hmm. They look good, but</Typography>
              <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)'></Typography>.
            </Box>
          </Box>
        </Box>
      </Box>

      <DropZone
        chipButtonInfo={cardData.p11.solution}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={cardData.p11.answer}
        resetButtonOnClick={resetButtonOnClick}
      />

      <BottomSheet bottomSheetTargetId='container' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>I think cotton is more comfortable than wool</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>여: 그렇군요. 이 진열대에 있는 이 양모 스웨터는 어떠세요? 모두 다 헐렁해요.</Typography>
            <Typography>남: 흠. 좋아 보이지만, 저는 양모보다는 면이 더 편한 것 같아요.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
