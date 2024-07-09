import { Input, InputStatus, Question, Typography } from '@maidt-cntn/ui';

import HE10L01C08A05a from './HE10L01C08A05a';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A05a } from './store';
import { studentAtom } from '@/stores/student';
import { ChangeEvent, useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P01';
  const pageKey = 'p01';

  const subQuestionInfo = (
    <Typography>
      <Typography useGap={false} weight={'var(--font-weight-bold)'}>
        1.
      </Typography>{' '}
      Celine (1){' '}
      <Typography useGap={false} textDecoration={'underline'}>
        finish
      </Typography>{' '}
      the project just before she (2){' '}
      <Typography useGap={false} textDecoration={'underline'}>
        receive
      </Typography>{' '}
      a call from her boss.
    </Typography>
  );

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
    changeData(pageNumber, 1, Number(name.slice(-1)), userInputs);
  };

  const inputNodes = (
    <>
      <Question type='text' size='small'>
        (1)
      </Question>
      <ItemWrap>
        <Input
          width='300px'
          name='value1'
          value={cardData[pageKey].answer.value1}
          onChange={handleInputChangeEvent}
          placeholder='내용을 넣어 주세요.'
          status={
            cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect[0]
              ? InputStatus.ERROR
              : isNotEmptyString(cardData[pageKey].answer.value1)
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          maxLength={20}
          readOnly={cardData[pageKey].isSubmitted}
          ariaLabel='1번 답란'
        />
      </ItemWrap>
      <Question type='text' size='small'>
        (2)
      </Question>
      <ItemWrap>
        <Input
          width='300px'
          name='value2'
          value={cardData[pageKey].answer.value2}
          onChange={handleInputChangeEvent}
          placeholder='내용을 넣어 주세요.'
          status={
            cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect[1]
              ? InputStatus.ERROR
              : isNotEmptyString(cardData[pageKey].answer.value2)
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          maxLength={20}
          readOnly={cardData[pageKey].isSubmitted}
          ariaLabel='2번 답란'
        />
      </ItemWrap>
    </>
  );

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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = (status: boolean[]) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: status } }));
    const isCorrect = status.every(val => val);
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer.value1,
            isAnswer: true,
            isCorrect: status[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageKey].answer.value2,
            isAnswer: true,
            isCorrect: status[1],
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
            answer:
              { value1: userSubmissionList[0].inputData[0]?.value, value2: userSubmissionList[0].inputData[1]?.value } || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? [userSubmissionList[0].inputData[0]?.isCorrect, userSubmissionList[0].inputData[1]?.isCorrect] : [false, false],
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
    <HE10L01C08A05a
      subQuestionInfo={subQuestionInfo}
      inputNodes={inputNodes}
      inputs={[cardData[pageKey].answer.value1, cardData[pageKey].answer.value2]}
      answers={[cardData[pageKey].solution.value1, cardData[pageKey].solution.value2]}
      mark={cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect.every(val => val) ? 'correct' : 'incorrect') : 'none'}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
