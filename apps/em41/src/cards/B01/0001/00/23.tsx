import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Label, Symbol, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';

const P23 = () => {
  const pageKey = 'P23';
  const solutionIndex = 2;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const handleChange = (value: number) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: value,
      },
    }));
    changeData(pageKey, 1, 1, value);
  };

  const defaultSubmission: userSubmissionType<number | undefined>[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
        },
      ],
    },
  ];
  const submitAnswer = () => {
    if (isSubmitted) {
      setShow(show => !show);
    }
    const answer = cardData[pageKey].answer;
    const isCorrect = answer === solutionIndex;
    const userSubmission: userSubmissionType<number | undefined>[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
      },
    }));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.value,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const { isSubmitted } = cardData[pageKey];

  const markType: TMarkType = isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='23' type='icon' />
        다음 중에서 가장 큰 분수를 찾아 ○표 해 보세요.
      </>
    ),
    mark: markType,
  };
  const selectedValue = cardData[pageKey].answer;
  const isValid = selectedValue !== undefined;
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : isValid
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const bodyId = 'EM41B01000100P23';

  const optionsWithMaxJax = [
    <MathExpression equation='$\dfrac{7}{8}$' />,
    <MathExpression equation='1$\dfrac{3}{8}$' />,
    <MathExpression equation='2$\dfrac{1}{8}$' />,
    <MathExpression equation='$\dfrac{13}{8}$' />,
  ];
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitLabel}
      onSubmit={submitAnswer}
      submitBtnColor={submitButtonColor}
      submitDisabled={!isSubmitted && !isValid}
      useRound
      bodyId={bodyId}
    >
      <Box useFull hAlign='center' vAlign='center' display='flex' justifyContent='space-evenly'>
        {optionsWithMaxJax.map((item, index) => {
          const isSelected = selectedValue === index;
          const isCorrect = solutionIndex === index;
          const boxColor = isSelected && isSubmitted && !isCorrect ? 'red' : 'yellow';
          const correctType = !isSubmitted || isCorrect ? 'correct' : 'incorrect';
          return (
            <ItemContainer onClick={() => handleChange(index)} disabled={isSubmitted} key={index}>
              <Box background={boxColor} padding='16px 24px' useRound marginBottom='8px'>
                <Typography>{item}</Typography>
              </Box>
              <Box vAlign='center'>
                <Typography>(</Typography>
                <CircleCheck>{isSelected && <Symbol type={correctType} />}</CircleCheck>
                <Typography>)</Typography>
              </Box>
            </ItemContainer>
          );
        })}
      </Box>
      <BottomSheet bottomSheetTargetId={bodyId} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' display='flex' flexDirection='column'>
            {<MathExpression equation='2$\dfrac{1}{8}$에 ○표' />}
          </Box>

          <Box marginTop={'10px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <MathExpression equation='$\dfrac{13}{8}$을 대분수로 나타내면 1$\dfrac{5}{8}$입니다.' />
              <br />
              <MathExpression equation='자연수 부분을 비교하면 가장 큰 분수는 2$\dfrac{1}{8}$입니다.' />
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.div`
  width: 80px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export default P23;
