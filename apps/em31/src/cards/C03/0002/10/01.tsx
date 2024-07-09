import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import {
  IQuestionProps,
  EStyleButtonTypes,
  Box,
  Input,
  Typography,
  TMainHeaderInfoTypes,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  Label,
  Image,
} from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0002_10 } from './store';

const P01 = ({ isAdditional = false }: { isAdditional?: boolean }) => {
  const PAGE_NUMBER = 'P01';
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const { changeData, saveData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0002_10);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        공깃돌 15개를 3명이 똑같이 나누어 가지려고 합니다. 한 명이 가질 수 있는 공깃돌은 몇 개인가요?
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
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

  const checkAnswer = (answer: string, solution: string) => {
    const userExpr = answer.replace(/\s+/g, '');
    const correctExpr = solution.replace(/\s+/g, '');

    return correctExpr.startsWith(userExpr);
  };

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newAnswers = [...cardData.p01.answers];
    newAnswers[index] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, 1 + index, value);
  };

  const handleSubmit = () => {
    const { answers, solutions, isSubmitted } = cardData.p01;
    if (isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      const isCorrectAll = answers.every((answer, index) => checkAnswer(answer, solutions[index]));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answers[0],
              isAnswer: true,
              isCorrect: checkAnswer(answers[0], solutions[0]),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answers[1],
              isAnswer: true,
              isCorrect: checkAnswer(answers[1], solutions[1]),
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: isCorrectAll, isSubmitted: true } }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p01.answers;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answers: newAnswers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getInputStatus = (index: number) => {
    const { isSubmitted, answers, solutions } = cardData.p01;
    if (isSubmitted) {
      return checkAnswer(answers[index], solutions[index]) ? InputStatus.ENABLE : InputStatus.ERROR;
    } else {
      return answers[index] !== '' ? InputStatus.ENABLE : InputStatus.DEFAULT;
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p01;

    if (!isSubmitted) {
      return !answers.some(value => value === '') ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      headerInfo={isAdditional ? null : headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p01.isSubmitted || cardData.p01.answers.some(value => value === '')) && !cardData.p01.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/C03/0002/10/EA31302(수정).png' alt='공깃돌 15개가 그려진 그림입니다.' width='800px' height='137px' />
        </Box>
        <Box hAlign='center' marginTop='24px' flexDirection='column'>
          <Box vAlign='center'>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              title='식 입력란'
              marginLeft={8}
              maxLength={30}
              width='292px'
              value={cardData.p01.answers[0]}
              onChange={handleChange(0)}
              status={getInputStatus(0)}
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              title='답 입력란'
              type='number'
              marginLeft={8}
              maxLength={30}
              width='240px'
              value={cardData.p01.answers[1]}
              onChange={handleChange(1)}
              status={getInputStatus(1)}
              readOnly={cardData.p01.isSubmitted}
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p01.solutions.join(', ')}</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='22px'>
            <Typography size={EStyleFontSizes.MEDIUM}>
              공깃돌 15개를 3명이 똑같이 나누어 가지면 한 명이 가질 수 있는 공깃돌은 15÷3=5(개)입니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
