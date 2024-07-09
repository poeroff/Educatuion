import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import HE01702 from '@maidt-cntn/pages/HE-017-02';
import { EChipButtonType, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A06b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A06b);
  const { userId } = useRecoilValue(studentAtom);
  const [mark, setMark] = useState<string>();
  const PAGE_ID = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q3. Check T (true) or F (false) according to the passage.',
    mark: mark,
  };

  const content =
    `Dark patterns on digital platforms are becoming more complex and more prevalent. ` +
    `So, what is driving their growth? ` +
    `Over the years, online commerce has grown steadily, especially with the development of smart phones and other digital technologies. ` +
    `As the competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases. ` +
    `While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid marketing strategies. ` +
    `Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships.`;

  const questionList = ['Critics do not accept that dark patterns as valid marketing strategies.'];

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

  const handleValueChange = (values: string[], type: EChipButtonType, index: number) => {
    const choiceValue = type === EChipButtonType.TRUE ? (values[index] === 'T' ? '' : 'T') : values[index] === 'F' ? '' : 'F';
    const originalValue = cardData.p02.values;
    const newValue = [...originalValue];
    newValue[index] = choiceValue;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, values: newValue } }));
    changeData(PAGE_ID, 1, 1, newValue);
  };

  const processQuestionMark = (values: string[], answers: string[]) => {
    if (!areArraysEqualIgnoringCaseAndWhitespace(values, answers)) {
      setMark('incorrect');
    } else {
      setMark('correct');
    }
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
