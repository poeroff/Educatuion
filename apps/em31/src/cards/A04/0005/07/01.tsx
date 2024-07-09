import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0005_07 } from './store';
import { isAnswer, removeSpaces, isNumber } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0005_07);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>노란색 끈의 길이는 13 m입니다. 파란색 끈의 길이가 노란색 끈의 길이의 6배라면 파란색 끈의 길이는 몇 m인가요?</>,
    mark: cardData.p01.isSubmitted ? (cardData.p01.answer1.isCorrect && cardData.p01.answer2.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isCorrectAnswer = (answer: string, solution: string[]) => {
    return solution.some(element => isAnswer(removeSpaces(answer), removeSpaces(element)));
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }

    const isCorrectAnswer1 = isCorrectAnswer(cardData.p01.answer1.value, cardData.p01.solution1);
    const isCorrectAnswer2 = isAnswer(cardData.p01.answer2.value, cardData.p01.solution2);
    const isCorrect = isCorrectAnswer1 && isCorrectAnswer2;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: {
          ...cardData.p01.answer1,
          isCorrect: isCorrectAnswer1,
        },
        answer2: {
          ...cardData.p01.answer2,
          isCorrect: isCorrectAnswer2,
        },
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1.value,
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2.value,
            isAnswer: true,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const isCorrectAnswer1 = isCorrectAnswer(userSubmissionList[0].inputData[0]?.value, cardData.p01.solution1);
        const isCorrectAnswer2 = isAnswer(userSubmissionList[0].inputData[1]?.value, cardData.p01.solution2);

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: isCorrectAnswer1,
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: isCorrectAnswer2,
            },
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
      changeData('P01', 1, subKey, value);
    } else if (subKey === 2 && isNumber(value)) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
      changeData('P01', 1, subKey, value);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value)}
      submitBtnColor={
        !(cardData.p01.answer1.value && cardData.p01.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              minWidth='296px'
              marginLeft={12}
              maxLength={100}
              textAlign='center'
              value={cardData.p01.answer1.value}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='식을 적어주세요.'
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.answer1.value
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.answer2.value}
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel='답을 적어주세요.'
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.answer2.value
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <Typography>m</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>13×6=78 또는 6×13=78 또는 13×6 또는 6×13, 78</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Box>
              <Typography>파란색 끈의 길이는 노란색 끈의 길이인 13 m의 6배이므로 13×6=78 (m)입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
