import { IQuestionProps, Input, InputStatus, Label, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C01_0006_42 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { isNumber } from '@maidt-cntn/util/CommonUtil';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0006_42);
  const { userId } = useRecoilValue(studentAtom);
  const pageKey = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        어떤 수에 471을 더했더니 857이 되었습니다. 어떤 수를 구해 보세요.
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
