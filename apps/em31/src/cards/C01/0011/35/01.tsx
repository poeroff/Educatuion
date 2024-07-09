import { useEffect, useState } from 'react';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, Label, Question, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { C01_0011_35 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0011_35);
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize={28}>
        <Box marginRight={20}>[5~6]</Box>
        편의점에서 사탕 1개는 596원, 초콜릿 1개는 914원에 할인하여 팝니다. 세아는 용돈 1400원으로 사탕 1개와 초콜릿 1개를 사려고 합니다.
      </Box>
    ),
  };

  const isAnswerCorrect = (answer: string, solution: string | string[]) => {
    // 숫자 사이의 공백이 있다면 false 반환
    if (/\d\s+\d/.test(answer)) {
      return false;
    }

    // 입력한 값의 모든 공백을 제거
    const normalizedAnswer = answer.replace(/\s+/g, '');

    // solution이 배열인 경우, 배열의 요소 중 하나라도 일치하면 true 반환
    if (Array.isArray(solution)) {
      return solution.some(sol => normalizedAnswer === sol);
    }

    // solution이 단일 문자열인 경우, 문자열과 일치하는지 확인
    return normalizedAnswer === solution;
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect1 = isAnswerCorrect(cardData.p01.answer1, cardData.p01.solution1);
    const isCorrect2 = isAnswerCorrect(cardData.p01.answer2, cardData.p01.solution2);
    const isCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
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
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer1 || !cardData.p01.answer2}
      submitBtnColor={
        cardData.p01.answer1 && cardData.p01.answer2 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
      useRound
    >
      <Question size='medium' type='number' number='6' mark={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
        사탕 1개와 초콜릿 1개를 사려면 얼마가 필요한가요?
      </Question>
      <Box hAlign='center'>
        <Box vAlign='baseline' flexDirection='column' marginTop='24px'>
          <Box hAlign='center'>
            <Label
              value={'식'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Input
              width='344px'
              textAlign='center'
              name='value1'
              maxLength={20}
              value={cardData.p01.answer1}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.answer1
                  ? 'default'
                  : cardData.p01.isSubmitted && !isAnswerCorrect(cardData.p01.answer1, cardData.p01.solution1)
                  ? 'error'
                  : 'enable'
              }
              ariaLabel='답을 적어주세요.'
            />
          </Box>
          <Box hAlign='center' marginTop='8px'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Input
              textAlign='center'
              name='value2'
              value={cardData.p01.answer2}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.answer2
                  ? 'default'
                  : cardData.p01.isSubmitted && !isAnswerCorrect(cardData.p01.answer2, cardData.p01.solution2)
                  ? 'error'
                  : 'enable'
              }
              width='217px'
              ariaLabel='답을 적어주세요.'
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>596+914=1510 또는 914+596=1510 또는 596+914 또는 914+596, 1510</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>(사탕 1개 가격)+(초콜릿 1개 가격)=596+914=1510(원)</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
