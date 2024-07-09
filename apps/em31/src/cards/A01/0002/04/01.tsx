import { Input, InputStatus, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import { ChangeEvent, useEffect } from 'react';
import { A01_0002_04 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const pageNumber = 'P01';
  const pageKey = 'p01';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0002_04);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];
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
    changeData(pageNumber, mainKey, subKey, userInputs);
  };
  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '배달한 물건 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        드론으로 배달한 물건 수를 구하는 식을 써 보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      name={'value1'}
      value={cardData[pageKey].answer.value1}
      onChange={handleInputChangeEvent}
      width='300px'
      maxLength={15}
      ariaLabel='식 입력란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
          ? InputStatus.ERROR
          : cardData[pageKey].isSubmitted
          ? InputStatus.ENABLE
          : isNotEmptyString(cardData[pageKey].answer.value1)
          ? InputStatus.ENABLE
          : InputStatus.DEFAULT
      }
    />,
  ];

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
