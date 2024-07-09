import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM04902 from '@maidt-cntn/math/pages/EM-049-02';
import { IQuestionProps, Label, TMarkType } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';
import { MathExpression } from '@maidt-cntn/ui/math';

const P16 = () => {
  const pageKey = 'P16';
  const solutionIndex = 1;

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
        <Label value='16' type='icon' />
        컴퍼스를 사용하여 지름이 6 cm인 원을 그리려고 합니다. 컴퍼스를 몇 cm만큼 벌려야 하나요?
      </>
    ),
    mark: markType,
  };

  return (
    <EM04902
      questionInfo={questionInfo}
      options={['3 cm', '4 cm', '6 cm', '12 cm']}
      onChange={handleChange}
      isSubmitted={isSubmitted}
      onSubmit={submitAnswer}
      solutionIndex={solutionIndex}
      commentary={
        <>
          지름이 6 cm인 원의 반지름은 <MathExpression equation='$6\div2=3$'></MathExpression> (cm)입니다.
        </>
      }
      selectedValue={cardData[pageKey].answer}
    />
  );
};

export default P16;
