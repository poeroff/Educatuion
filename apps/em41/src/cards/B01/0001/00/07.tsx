import { Input, InputStatus, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import { ChangeEvent, useEffect, useState } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';

const P07 = () => {
  const pageNumber = 'P07';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNumber(value)) {
      return;
    }
    const userInputs = {
      ...cardData[pageNumber].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, mainKey, subKey, userInputs);
  };
  const [isShow, setShow] = useState<boolean>(false);
  const submitAnswer = (isCorrect: boolean) => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: mainKey,
          inputData: [
            {
              subKey: subKey,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
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

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='7' type='icon' />한 상자에 초콜릿이 13 개씩 들어 있습니다 . 6 상자에 들어 있는 초콜릿의 수를 구해 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const inputNodes: React.ReactNode[] = [
    <>
      <Input
        key={'value1'}
        name={'value1'}
        value={cardData[pageNumber].answer.value1}
        onChange={handleInputChangeEvent}
        width='150px'
        maxLength={15}
        title='답란'
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
            ? InputStatus.ERROR
            : cardData[pageNumber].isSubmitted
            ? InputStatus.ENABLE
            : isNotEmptyString(cardData[pageNumber].answer.value1)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
      />{' '}
      개
    </>,
  ];

  return (
    <EM02101
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      answers={cardData[pageNumber].answer}
      inputNodes={inputNodes}
      solutions={cardData[pageNumber].solution}
      submitted={cardData[pageNumber].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
    />
  );
};

export default P07;
