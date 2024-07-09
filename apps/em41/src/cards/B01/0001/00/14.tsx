import { Input, InputStatus, IQuestionProps, Label, Typography } from '@maidt-cntn/ui';
import EM02101 from '@maidt-cntn/math/pages/EM-021-01';
import { ChangeEvent, useEffect, useState } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P14 = () => {
  const pageKey = 'P14';
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
          value: '',
          isAnswer: true,
        },
      ],
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
    changeData(pageKey, mainKey, subKey, userInputs);
  };
  const [isShow, setShow] = useState<boolean>(false);
  const submitAnswer = (isCorrect: boolean) => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
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
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={14} />
        연서는 하루에 줄넘기를 50회씩 31일 동안 했습니다. 연서가 줄넘기를 한 횟수는 모두 몇 회인지 구해 보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      type='number'
      name={'value'}
      value={cardData[pageKey].answer.value}
      onChange={handleInputChangeEvent}
      width='150px'
      maxLength={15}
      title='답 입력란'
      readOnly={cardData[pageKey].isSubmitted}
      status={
        cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
          ? InputStatus.ERROR
          : cardData[pageKey].isSubmitted
          ? InputStatus.ENABLE
          : isNotEmptyString(cardData[pageKey].answer.value)
          ? InputStatus.ENABLE
          : InputStatus.DEFAULT
      }
    />,
    <Typography>회</Typography>,
  ];

  return (
    <EM02101
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

export default P14;
