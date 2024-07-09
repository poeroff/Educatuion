import { IQuestionProps, Input, InputStatus, SvgIcon } from '@maidt-cntn/ui';
import { MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0007_40 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import EM02001 from '@maidt-cntn/math/pages/EM-020-01';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const pageKey = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0007_40);

  const defaultInputData: inputDatasType[] = cardData.P01.answer.map((ans, idx) => ({
    subKey: idx + 1,
    type: 'TEXT',
    value: '',
    isAnswer: true,
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
          P01: {
            ...prev.P01,
            answer: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData.P01.answer,
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
    if (cardData.P01.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect = result.every(val => val);
    setCardData(prev => ({ ...prev, P01: { ...prev.P01, isSubmitted: true, isCorrect: isCorrect, isCorrectInput: result } }));

    const inputData: inputDatasType[] = cardData.P01.answer.map((value, idx) => ({
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <MathExpression equation={'민규는 전체 쪽수가 360쪽인 책을 읽고 있습니다. 오늘까지 175쪽을 읽었다면 몇 쪽을 더 읽어야 다 읽을 수 있나요?'} />
      </>
    ),
    size: 'medium',
    mark: cardData.P01.isSubmitted ? (cardData.P01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const checkStatus = (index: number) => {
    return cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrectInput[index]
      ? InputStatus.ERROR
      : isNotEmptyString(cardData[pageKey].answer[index])
      ? InputStatus.ENABLE
      : InputStatus.DEFAULT;
  };

  const handleInputChangeEvent = (value: string, index: number) => {
    const updatedAnswers = cardData.P01.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      P01: {
        ...prev.P01,
        answer: updatedAnswers,
      },
    }));
    changeData(pageKey, 1, index + 1, updatedAnswers);
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      name={'value1'}
      marginLeft={12}
      textAlign='center'
      value={cardData[pageKey].answer[0]}
      onChange={e => handleInputChangeEvent(e.target.value, 0)}
      width='296px'
      ariaLabel='남은 쪽수를 구하는 식'
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(0)}
      maxLength={50}
    />,
    <Input
      type='number'
      name={'value2'}
      marginLeft={12}
      textAlign='center'
      value={cardData[pageKey].answer[1]}
      onChange={e => handleInputChangeEvent(e.target.value, 1)}
      width='124px'
      ariaLabel='답란'
      maxLength={50}
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(1)}
    />,
  ];

  return (
    <EM02001
      headerInfo={null}
      questionInfo={questionInfo}
      inputNodes={inputNodes}
      answers={cardData.P01.answer}
      solutions={cardData.P01.solution}
      submitted={cardData.P01.isSubmitted}
      onSubmit={submitAnswer}
      commentary={cardData.P01.commentary}
      unit='쪽'
    />
  );
};
export default P01;
