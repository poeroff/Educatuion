import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, Tag, Typography, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0002_07 } from './store';
import { isAnswer, removeSpaces, isNumber } from '@maidt-cntn/util/CommonUtil';

import headerIcon from '../../../../assets/icon/header_write.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0002_07);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

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

  const isCorrectAnswer1 = isCorrectAnswer(cardData.p01.answer1.value, cardData.p01.solution1);
  const isCorrectAnswer2 = isAnswer(cardData.p01.answer2.value, cardData.p01.solution2);
  const isCorrect = isCorrectAnswer1 && isCorrectAnswer2;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Box vAlign='flex-start' marginTop={10} marginRight={12}>
          <SvgIcon src={headerIcon} size='36px' />
        </Box>
        로봇이 한 상자에 20개씩 들어 있습니다. 3상자에 들어 있는 로봇은 모두 몇 개인가요?
      </>
    ),
    mark: cardData.p01.isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }

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
        console.log(userSubmissionList[0]);

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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value)}
      submitBtnColor={
        !(cardData.p01.answer1.value && cardData.p01.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
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
              onChange={e => handleChange(1, e.target.value.replace(/\s/gi, ''))}
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
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.answer2.value}
              onChange={e => handleChange(2, e.target.value.trim())}
              ariaLabel='답을 적어주세요.'
              type='number'
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.answer2.value
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>20×3=60 또는 3×20=60 또는 3×20 또는 20×3, 60</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Box>
              <Typography>로봇이 한 상자에 20개씩 3상자에 들어 있으므로 로봇은 모두 20×3=60(개)입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
