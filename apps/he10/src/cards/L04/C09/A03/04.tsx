import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import HE00303, { IHE00303Info } from '@maidt-cntn/pages/HE-003-03';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C09A03 } from './store';

const P04 = () => {
  const pageNumber = 'P04';
  const pageKey = pageNumber.toLowerCase() as 'p04';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };
  const questionInfo: IQuestionProps = {
    text: 'Write about the graph above based on Page 1~3 and revise it.',
  };
  const info: IHE00303Info = {
    imageSrc: '/L04/C09/A03/HE1-L04-C09-A03-P04.jpg',
    hiddenText: `이 이미지는 그래프를 설명하는 글의 템플릿 입니다.
      The graph above shows 빈칸. The largest portion, 53 percent, is used for 빈칸, followed by household appliances, which consumes 빈칸 present. Water heating is 빈칸, consuming 16 percent of home energy. 빈칸 accounts for the smallest share at only 2 percent. With more people reducing their space heating, it is possible to save energy. We can do this not only by 빈칸 but also by 빈칸.`,
    exampleAnswer:
      'The graph above shows the distribution of energy consumption at home. The largest portion, 53 percent, is used for space heating, followed by household appliances, which consumes 19 percent. Water heating is the third largest contributor, consuming 16 percent of home energy. Lighting accounts for the smallest share at only 2 percent. With more people reducing their space heating, it is possible to save energy. We can do this not only by wearing more clothes but also by putting curtains on the windows.',
  };
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

  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C09A03);
  const cardPageData = cardData[pageKey];
  const { answer, isSubmitted } = cardPageData;

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (!pageId) return;

    const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
    initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);

    const inputData: inputDatasType[] = userSubmissionList?.[0]?.inputData;
    if (!inputData) return;

    const inputAnswer = inputData[0].value as string;
    changeCardData({ answer: inputAnswer, isSubmitted });
  };

  const changeCardData = (data: Partial<typeof cardData.p04>) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], ...data } }));
  };

  const handleChange = (text: string) => {
    changeCardData({ answer: text });
    changeData(pageNumber, 1, 1, text);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: answer,
            isAnswer: true,
          },
        ],
      },
    ];

    submitData(pageNumber, userSubmission);
    changeCardData({ isSubmitted: true });
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }

    return () => {
      saveData(pageNumber);
    };
  }, [pageIds]);

  return (
    <HE00303
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      info={info}
      textAnswer={answer}
      isSubmitted={isSubmitted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default P04;
