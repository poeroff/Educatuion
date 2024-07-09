import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM04902 from '@maidt-cntn/math/pages/EM-049-02';
import { IQuestionProps, Image, Label, TMarkType } from '@maidt-cntn/ui';
import { MathExpression } from '@maidt-cntn/ui/math';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { B01_0001_00 } from './store';

const P21 = () => {
  const pageKey = 'P21';
  const solutionIndex = 3;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const handleChange = (value: string) => {
    const answer = parseInt(value);
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer,
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
          type: 'NUMBER',
        },
      ],
    },
  ];
  const submitAnswer = () => {
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
        <Label value='21' type='icon' />
        팽이 20개를 4개씩 묶었을 때 12는 20의 몇 분의 몇인가요?
      </>
    ),
    mark: markType,
  };

  const optionsWithMaxJax = [
    <JaxContainer>
      <MathExpression equation='$\frac{3}{4}$' />
    </JaxContainer>,
    <JaxContainer>
      <MathExpression equation='$\frac{2}{5}$' />
    </JaxContainer>,
    <JaxContainer>
      <MathExpression equation='$\frac{3}{5}$' />
    </JaxContainer>,
    <JaxContainer>
      <MathExpression equation='$\frac{4}{5}$' />
    </JaxContainer>,
  ];
  return (
    <EM04902
      questionInfo={questionInfo}
      image={<Image src={'/B00/DJC410010.png'} alt={'팽이 20개가 4개씩 5묶음으로 그려진 그림입니다.'} width='450px' />}
      options={optionsWithMaxJax}
      onChange={handleChange}
      isSubmitted={isSubmitted}
      onSubmit={submitAnswer}
      solutionIndex={solutionIndex}
      selectedValue={cardData[pageKey].answer}
      commentary={
        <>
          12는 똑같이 5묶음으로 나눈 것 중의 3묶음이므로 12는 20의 <MathExpression equation='$\dfrac{3}{5}$' />
          입니다.
        </>
      }
    />
  );
};

const JaxContainer = styled.div`
  margin-left: 20px;
`;

export default P21;
