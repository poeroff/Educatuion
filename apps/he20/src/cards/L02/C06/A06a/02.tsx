import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L02C06A06a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L02C06A06a);

  const pageKey = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q3. What is critics’ opinion about dark patterns?',
  };

  const content =
    `Dark patterns on digital platforms are becoming more complex and more prevalent. ` +
    `So, what is driving their growth? ` +
    `Over the years, online commerce has grown steadily, especially with the development of smart phones and other digital technologies. ` +
    `As the competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases. ` +
    `While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid marketing strategies. ` +
    `Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships.`;

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

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

  const handleOnSubmit = (isCorrect: boolean) => {
    if (!cardData[pageKey].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
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

  const handleChange = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncateValue } }));
    changeData(pageKey, 1, 1, truncateValue);
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
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={{ value1: cardData[pageKey].answer }}
      answer={{ value1: cardData[pageKey].solution }}
      onInputChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(target.value);
      }}
      submitType={'complete'}
      onSubmit={isCorrect => handleOnSubmit(isCorrect[0])}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P02;
