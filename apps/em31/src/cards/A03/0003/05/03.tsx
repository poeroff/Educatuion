import { IQuestionProps, Input, InputStatus, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { isNumber } from '@maidt-cntn/util/CommonUtil';
import { A03_0003_05 } from './store';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0003_05);
  const { userId } = useRecoilValue(studentAtom);
  const pageKey = 'P03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈식으로 나타내기',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        바둑돌 15개를 5개씩 묶으면 몇 묶음인지 나눗셈식으로 나타내보세요.
      </>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answers,
      [name]: value,
    };
    if (isNumber(value)) {
      setCardData(prev => ({
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          answers: userInputs,
        },
      }));
      changeData(pageKey, 1, 1, userInputs);
    }
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      type='number'
      name={'value1'}
      value={cardData[pageKey].answers.value1}
      onChange={handleInputChangeEvent}
      width='130px'
      ariaLabel='1번 답란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && cardData[pageKey].isCorrectArr && !cardData[pageKey].isCorrectArr.value1
          ? InputStatus.ERROR
          : !isNotEmptyString(cardData[pageKey].answers.value1)
          ? InputStatus.DEFAULT
          : InputStatus.ENABLE
      }
      maxLength={3}
    />,
    <Input
      type='number'
      name={'value2'}
      value={cardData[pageKey].answers.value2}
      onChange={handleInputChangeEvent}
      width='130px'
      ariaLabel='2번 답란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && cardData[pageKey].isCorrectArr && !cardData[pageKey].isCorrectArr.value2
          ? InputStatus.ERROR
          : !isNotEmptyString(cardData[pageKey].answers.value2)
          ? InputStatus.DEFAULT
          : InputStatus.ENABLE
      }
      maxLength={3}
    />,
    <Input
      type='number'
      name={'value3'}
      value={cardData[pageKey].answers.value3}
      onChange={handleInputChangeEvent}
      width='130px'
      ariaLabel='어떤 수 입력란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && cardData[pageKey].isCorrectArr && !cardData[pageKey].isCorrectArr.value3
          ? InputStatus.ERROR
          : !isNotEmptyString(cardData[pageKey].answers.value3)
          ? InputStatus.DEFAULT
          : InputStatus.ENABLE
      }
      maxLength={3}
    />,
  ];

  const signs = ['÷', '='];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = (isCorrect: boolean, isCorrectArr: { [key: string]: boolean }) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect, isCorrectArr: isCorrectArr } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answers,
            isAnswer: true,
            isCorrect,
          },
          { subKey: 2, type: 'TEXT_LIST', value: isCorrectArr },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
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
            answers: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrectArr: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].isCorrectArr,
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

  return (
    <EM02101
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      answers={cardData[pageKey].answers}
      inputNodes={inputNodes}
      signs={signs}
      solutions={cardData[pageKey].solutions}
      submitted={cardData[pageKey].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageKey].commentary}
      onSubmit={submitAnswer}
    />
  );
};

export default P03;
