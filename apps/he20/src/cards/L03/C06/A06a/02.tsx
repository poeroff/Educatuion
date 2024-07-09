import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L03C06A06a } from './store';

const P02 = () => {
  const pageNo = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A06a);

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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(pageNo, 1, 1, value);
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
              value: cardData.p02.answer,
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
    headerText: 'From Shadows to Spotlights (4)',
  };
  const questionInfo = {
    text: 'Q4. How did Anna Ancher differ from other artists of that era?',
  };
  const answer = {
    value1: 'She showcased women as active participants in everyday tasks while other artists depicted them as still life subjects.',
  };
  const content = `Now let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark. When observing her paintings, you may notice a common theme — they all feature female figures. Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school. After that, she even studied abroad in Paris, which was unusual for women at the time. Thanks to her mother’s encouragement, she was able to take advantage of these opportunities. Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties. Ancher differed from other artists of that era, who depicted women as still life subjects. In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing Fisherman’s Wife. She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark. In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed. Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent. Her paintings continue to amaze us to this day.\n\nThank you for joining this guided tour, and I hope my explanations have aided you in appreciating these paintings. Please take some time to further explore the exhibition.`;

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={{ value1: cardData.p02.answer }}
      answer={answer}
      onInputChange={e => {
        handleInputChange(e.target.value);
      }}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P02;
