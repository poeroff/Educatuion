import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01702 from '@maidt-cntn/pages/HE-017-02';
import { EChipButtonType, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A03b } from './store';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A03b);
  const { userId } = useRecoilValue(studentAtom);
  const [mark, setMark] = useState<string>();
  const PAGE_ID = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (1)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q1. Check T (true) or F (false) according to the passage.',
    mark: mark,
  };

  const content = `The phone rang, and it was my dad calling from my hometown, Waituhi.
    “Can you take a week off?” he asked. “Your Nani Tama wants you here.”
    “But Dad!” I answered. “My boss won’t let me take any more time off.”
    The phone went silent, and then I heard my grandfather say faintly,
    “I need your help, Grandson. I must go to Murupara to finish the whakapapa.
    Drive me there. Hurry, I may not have much time.”
    I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll  come.”`;

  const questionList = ['Nani Tama must go to Murupara to finish the whakapapa.'];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: 0,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      processQuestionMark(cardData.p02.values, cardData.p02.answers);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.values,
            },
          ],
        },
      ];
      submitData(PAGE_ID, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (isSubmitted && userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            values: userSubmissionList[0].inputData[0]?.value || cardData.p02.values,
            isSubmitted: true,
          },
        }));
        processQuestionMark(userSubmissionList[0].inputData[0]?.value || cardData.p02.values, cardData.p02.answers);
      } else if (cardData.p02.isSubmitted) {
        processQuestionMark(cardData.p02.values, cardData.p02.answers);
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const processQuestionMark = (values: string[], answers: string[]) => {
    if (!areArraysEqualIgnoringCaseAndWhitespace(values, answers)) {
      setMark('incorrect');
    } else {
      setMark('correct');
    }
  };

  const handleValueChange = (values: string[], type: EChipButtonType, index: number) => {
    const choiceValue = type === EChipButtonType.TRUE ? (values[index] === 'T' ? '' : 'T') : values[index] === 'F' ? '' : 'F';
    const originalValue = cardData.p02.values;
    const newValue = [...originalValue];
    newValue[index] = choiceValue;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, values: newValue } }));
    changeData(PAGE_ID, 1, 1, newValue);
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    // 배열의 길이가 다르면 false 반환
    if (value.length !== answer.length) {
      return false;
    }
    // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
    return value.every((val, index) => isAnswer(val, answer[index]));
  };

  return (
    <HE01702
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      questionList={questionList}
      answers={cardData.p02.answers}
      answerLabel='답안'
      values={cardData.p02.values}
      handleValueChange={handleValueChange}
      isSubmitted={cardData.p02.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P02;
