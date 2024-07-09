import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM04902 from '@maidt-cntn/math/pages/EM-049-02';
import { IQuestionProps, Image, Label, TMarkType } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';

const P20 = () => {
  const pageKey = 'P20';
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
        <Label value='20' type='icon' />
        물이 들어 있는 수조의 눈금을 바르게 읽은 것을 찾아보세요.
      </>
    ),
    mark: markType,
  };

  return (
    <EM04902
      questionInfo={questionInfo}
      image={
        <Image
          src={'/B00/DJC410009.png'}
          alt={'2 L와 3 L 사이에 눈금이 10칸 있고, 물의 높이는 2 L에서 작은 눈금 2칸 더 간 곳을 가리키고 있는 수조 그림입니다.'}
          width='450px'
        />
      }
      options={['1 L 200 mL', '2 L', '2 L 200 mL', '3 L']}
      onChange={handleChange}
      isSubmitted={isSubmitted}
      onSubmit={submitAnswer}
      solutionIndex={solutionIndex}
      commentary='수조에 있는 눈금과 단위를 읽으면 수조에 담겨 있는 물은 2 L  200 mL입니다.'
      selectedValue={cardData[pageKey].answer}
    />
  );
};

export default P20;
