import { useEffect, useState } from 'react';
import { MathExpression } from '@maidt-cntn/ui/math';
import { IQuestionProps, Input, InputStatus, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import EM02001 from '@maidt-cntn/math/pages/EM-020-01';
import { C01_0006_10 } from './store';

const P02 = () => {
  const pageKey = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0006_10);

  const defaultInputData: inputDatasType[] = cardData[pageKey].answer.map((ans, idx) => ({
    subKey: idx + 1,
    type: 'TEXT',
    value: '',
  }));

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: defaultInputData,
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
            isCorrectInput: isSubmitted ? userSubmissionList[0]?.inputData.map((item: { isCorrect: boolean }) => item.isCorrect) : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = (result: boolean[]) => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect = result.every(val => val);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect, isCorrectInput: result } }));

    const inputData: inputDatasType[] = cardData[pageKey].answer.map((value, idx) => ({
      subKey: idx + 1,
      type: 'TEXT',
      value: value || '',
      isCorrect: result[idx],
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: inputData,
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <MathExpression
          equation={
            '집에서 소방서까지의 거리는 834m 이고 집에서 도서관까지의 거리는 652m입니다. 집에서 소방서까지는 집에서 도서관까지보다 몇 m 더 먼가요?'
          }
        />
      </>
    ),
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const checkStatus = (index: number) => {
    return cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrectInput[index]
      ? InputStatus.ERROR
      : isNotEmptyString(cardData[pageKey].answer[index])
      ? InputStatus.ENABLE
      : InputStatus.DEFAULT;
  };

  const handleInputChangeEvent = (value: string, index: number) => {
    setCardData(prev => {
      const newCardData = JSON.parse(JSON.stringify(prev));
      newCardData[pageKey].answer[index] = value;
      return newCardData;
    });
    changeData(pageKey, 1, index + 1, value);
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      name={'value1'}
      marginLeft={12}
      textAlign='center'
      value={cardData[pageKey].answer[0]}
      onChange={e => handleInputChangeEvent(e.target.value, 0)}
      width='296px'
      ariaLabel='얼마나 더 먼 지 구하는 식'
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(0)}
      maxLength={12}
    />,
    <Input
      name={'value2'}
      marginLeft={12}
      textAlign='center'
      value={cardData[pageKey].answer[1]}
      onChange={e => handleInputChangeEvent(e.target.value, 1)}
      width='124px'
      ariaLabel='답란'
      maxLength={4}
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(1)}
    />,
  ];

  return (
    <EM02001
      unit='m'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      inputNodes={inputNodes}
      answers={cardData[pageKey].answer}
      solutions={cardData[pageKey].solution}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
      commentary={cardData[pageKey].commentary}
    />
  );
};
export default P02;
