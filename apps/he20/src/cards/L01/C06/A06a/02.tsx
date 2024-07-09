import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L01_C06_A06a } from './store';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01_C06_A06a);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: cardData[pageKey].answer.value1,
          isAnswer: true,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

    changeData(pageNumber, 1, 1, value);
  };
  const [isShow, setShow] = useState(false);
  const submitAnswer = (isWrong: boolean[]) => {
    const isCorrect = isWrong.every(item => !item);
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
              type: 'TEXTAREA',
              value: cardData[pageKey].answer.value1,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
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
            answer: { value1: userSubmissionList[0].inputData[0]?.value } || cardData[pageKey].answer,
            isSubmitted,
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

  const questionInfo: IQuestionProps = {
    text: cardData.common.questionInfo.text,
    size: cardData.common.questionInfo.size,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: cardData.common.headerInfo.headerText,
  };
  const content =
    'This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant. After spending 25 years ' +
    'carrying tourists along rough roads, she developed a twisted spine and foot pain. In order to support Jane in taking care of Molly’s ' +
    'foot, we took part in positive reinforcement training, which involves using rewards to encourage desirable behaviors. When I gently ' +
    'touched her foot with a pole and called out, “foot,” she lifted it. We then rewarded her with a sweet piece of watermelon, her ' +
    'favorite fruit. This training helps reduce the stress that animals experience during controlled situations, such as treatment or a ' +
    'health examination. The good news is Molly seems to be adapting well, and I expect her to get better soon.';

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={cardData[pageKey].answer}
      answer={cardData[pageKey].solution}
      onInputChange={handleInputChangeEvent}
      submitType={'complete'}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P02;
