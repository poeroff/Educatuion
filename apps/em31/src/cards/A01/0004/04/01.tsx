import { useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { IQuestionProps, Input, InputStatus, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A01_0004_04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0004_04);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P01';
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '필요한 블록 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        필요한 블록 수를 구하는 식을 써 보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const removeSpaceValue = value.replace(/\s/gi, '');
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: removeSpaceValue,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, 1, userInputs);
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      name={'value1'}
      value={cardData[pageKey].answer.value1}
      onChange={handleInputChangeEvent}
      width='300px'
      ariaLabel='필요한 블록 수를 구하는 식'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
          ? InputStatus.ERROR
          : isNotEmptyString(cardData[pageKey].answer.value1)
          ? InputStatus.ENABLE
          : InputStatus.DEFAULT
      }
    />,
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer.value1,
            isAnswer: true,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: { value1: userSubmissionList[0].inputData[0]?.value } || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect || cardData[pageKey].isCorrect,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <EM02101
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      answers={cardData[pageKey].answer}
      inputNodes={inputNodes}
      solutions={cardData[pageKey].solution}
      submitted={cardData[pageKey].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageKey].commentary}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
