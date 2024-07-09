import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { L01C06A03a } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageKey = 'p02';
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A03a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (1)',
  };

  const questionInfo = {
    text: (
      <>
        <Typography useGap={false} weight='var(--font-weight-extraBold)' style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
          Q1.&nbsp;
        </Typography>
        Where did the club members decide to go for their volunteer work?
      </>
    ),
  };

  const content = (
    <>
      As the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members. An animal sanctuary
      is a special place where rescued, injured, or abused animals can live in a safe and caring environment. All the club members and I agreed that
      the sanctuary would be the perfect place to learn about animal care. Excited for a new experience, we set out to volunteer.
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
          isAnswer: false,
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
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const handleInputChange = (value: string) => {
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncatedValue } }));
    changeData(pageNo, 1, 1, truncatedValue);
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
          },
        ],
      },
    ];

    submitData(pageNo, userSubmission);
  };

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitType='complete'
      content={content}
      inputs={{ value1: cardData[pageKey].answer }}
      onInputChange={event => handleInputChange(event.target.value)}
      answer={{ value1: cardData[pageKey].solution }}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={handleSubmit}
      answerLabel='모범답안'
    />
  );
};

export default P02;
