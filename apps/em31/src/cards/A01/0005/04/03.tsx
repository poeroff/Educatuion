import { IQuestionProps, Input, InputStatus, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A01_0005_04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0005_04);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P03';
  const pageKey = 'p03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '더 많은 도움 로봇 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        도움 로봇은 마음 로봇보다 몇 대 더 많은지 구해 보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answers,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answers: userInputs,
      },
    }));
    changeData(pageNumber, 1, 1, userInputs);
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      type='number'
      name={'value1'}
      value={cardData[pageKey].answers.value1}
      onChange={handleInputChangeEvent}
      width='130px'
      ariaLabel='도움 로봇의 수 입력란'
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
      ariaLabel='마음 로봇의 수 입력란'
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
      ariaLabel='도움 로봇의 수에서 마음 로봇의 수를 제외한 수 입력란'
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

  const signs = ['-', '='];

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

  const submitAnswer = (isCorrect: boolean, isCorrectArr: any) => {
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
            answers: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrectArr: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].isCorrectArr,
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
