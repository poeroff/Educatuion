import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE03702 from '@maidt-cntn/pages/HE-037-02';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HE20DT1, WordSelectQuestionKey } from '../store';

interface WordSelectQuestionProps {
  pageName: string;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
}

const WordSelectQuestion = ({ pageName, headerInfo, questionInfo }: WordSelectQuestionProps) => {
  const pageKey = pageName.toLowerCase() as WordSelectQuestionKey;
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(HE20DT1);
  const pageData = cardData[pageKey];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageName)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputData = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: typeof inputData[0]?.value === 'string' ? inputData[0]?.value : pageData.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageName, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = (isCorrect: boolean) => {
    const { answer1 } = pageData;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: answer1,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageName, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: string) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: value } }));
    changeData(pageName, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(pageName);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <HE03702
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      examples={pageData.examples}
      translations={pageData.translations}
      options={pageData.options}
      answer={pageData.answer1}
      solution={pageData.solution1}
      isCorrect={pageData.isCorrect}
      isSubmitted={pageData.isSubmitted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default WordSelectQuestion;
