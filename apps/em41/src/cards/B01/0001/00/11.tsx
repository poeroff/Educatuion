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
const P11 = () => {
  const pageKey = 'P11';
  const solutionIndex = 2;

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
        <Label value='11' type='icon' />
        다음은 전체를 9개로 똑같이 나눈 것입니다. 전체에 대한 색칠한 부분을 분수로 나타낸 것은 무엇인가요?
      </>
    ),
    mark: markType,
  };

  const optionsWithMaxJax = [
    <JaxContainer>
      <MathExpression equation='$\frac{3}{6}$' />
    </JaxContainer>,
    <JaxContainer>
      <MathExpression equation='$\frac{3}{9}$' />
    </JaxContainer>,
    <JaxContainer>
      <MathExpression equation='$\frac{6}{9}$' />
    </JaxContainer>,
    <JaxContainer>
      <MathExpression equation='$\frac{8}{9}$' />
    </JaxContainer>,
  ];

  return (
    <EM04902
      questionInfo={questionInfo}
      image={<Image src={'/B00/DJC410003.png'} alt={'정사각형을 9칸으로 나누고, 그중 3칸은 색칠되어 있는 그림입니다.'} width='210px' />}
      options={optionsWithMaxJax}
      onChange={handleChange}
      isSubmitted={isSubmitted}
      onSubmit={submitAnswer}
      solutionIndex={solutionIndex}
      commentary={
        <>
          색칠한 부분은 전체를 9개로 나눈 것 중의 3이므로 <MathExpression equation='$\dfrac{3}{9}$' /> 입니다.
        </>
      }
      selectedValue={cardData[pageKey].answer}
    />
  );
};

const JaxContainer = styled.div`
  margin-left: 20px;
`;
export default P11;
