import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A07a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNo = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A07a);

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
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || cardData.p02.userAnswer,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: { [name]: truncatedValue } } }));
    changeData(pageNo, 1, 1, truncatedValue);
  };

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p02.userAnswer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNo, userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (5)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. What is the purpose of the EU’s Digital Service Act?',
  };

  const content =
    'Dark patterns, in contrast, not only manipulate customers to act against their intentions, but they can also lead to financial losses and personal data leaks. To tackle this problem, extensive research across various websites and applications is being conducted to document the prevalence of dark patterns and come up with solutions. In addition to research, governments are actively discussing on how to regulate these deceptive design patterns. The EU’s Digital Service Act, which banned dark patterns on online platforms in 2022, is a good example of such regulation in this area. Such regulations are expected to increase, limiting companies’ deceptive marketing practices in the digital market. However, regulations alone may not be sufficient. As individuals, we should take steps to combat dark patterns and be responsible for our online shopping behavior. This includes being cautious while making purchases, reading terms and conditions carefully, and recognizing that companies’ interests may not be the same as our own. Developing an awareness of dark patterns is also essential to avoid potential harm and economic loss. Ultimately, our attention and efforts will protect us from manipulation and enable us to make wise decisions in this digital age.';

  const answerLabel = '모범답안';
  const answer = { value1: 'The purpose of the EU’s Digital Service Act is to ban dark patterns on online platforms.' };

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      answerLabel={answerLabel}
      answer={answer}
      inputs={cardData.p02.userAnswer}
      onInputChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = target;
        handleInputChange(name, value);
      }}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P02;
