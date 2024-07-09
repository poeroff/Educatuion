import { Input, InputStatus, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import { ChangeEvent, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0002_04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const pageNumber = 'P03';
  const pageKey = 'p03';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0002_04);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value2,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value3,
          isAnswer: true,
        },
      ],
      isCorrect: false,
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const [isShow, setShow] = useState<boolean>(false);
  const submitAnswer = (isCorrect: boolean) => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].answer.value1,
            },
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].answer.value2,
            },
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].answer.value3,
            },
          ],
          isCorrect: cardData[pageKey].isCorrect,
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
          [pageKey]: {
            ...prev[pageKey],
            answer:
              {
                value1: userSubmissionList[0].inputData[0]?.value,
                value2: userSubmissionList[0].inputData[1]?.value,
                value3: userSubmissionList[0].inputData[2]?.value,
              } || cardData[pageKey].answer,
            isSubmitted: isSubmitted || cardData[pageKey].isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : cardData[pageKey].isCorrect,
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

  const signs = ['+', '='];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '배달한 물건 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        드론으로 배달한 물건 수를 구해 보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      type='number'
      name={'value1'}
      value={cardData[pageKey].answer.value1}
      onChange={handleInputChangeEvent}
      width='130px'
      maxLength={5}
      ariaLabel='드론이 사랑 마을로 배달한 물건 수 입력란'
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
    <Input
      type='number'
      name={'value2'}
      value={cardData[pageKey].answer.value2}
      onChange={handleInputChangeEvent}
      width='130px'
      maxLength={5}
      ariaLabel='드론이 행복 마을로 배달한 물건 수 입력란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
          ? InputStatus.ERROR
          : cardData[pageKey].isSubmitted
          ? InputStatus.ENABLE
          : isNotEmptyString(cardData[pageKey].answer.value2)
          ? InputStatus.ENABLE
          : InputStatus.DEFAULT
      }
    />,
    <Input
      type='number'
      name={'value3'}
      value={cardData[pageKey].answer.value3}
      onChange={handleInputChangeEvent}
      width='130px'
      maxLength={5}
      ariaLabel='드론이 사랑 마을과 행복 마을로 배달한 물건 수 입력란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
          ? InputStatus.ERROR
          : cardData[pageKey].isSubmitted
          ? InputStatus.ENABLE
          : isNotEmptyString(cardData[pageKey].answer.value3)
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
      signs={signs}
      onSubmit={submitAnswer}
    />
  );
};

export default P03;
