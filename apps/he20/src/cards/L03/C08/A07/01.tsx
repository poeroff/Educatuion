import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, IQuestionProps, Question, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C08A07 } from './store';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const { initData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A07);
  const { userId } = useRecoilValue(studentAtom);


  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read the story.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p01.answer1,
          isAnswer: true,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);
  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const text = (
    <>
      <Question size='small' type='dot' >
        <Box>
          <Typography useGap={false} weight={500} style={{ display: 'inline' }}>
          I experienced a special moment last Sunday,
          <Typography useGap={false} weight={600} color={'var(--color-blue-700)'}>
            when
          </Typography>{' '}
          I first met my cat, Fluffy.
          </Typography>
        </Box>
      </Question>
      <Question size='small' type='dot'>
        <Box>
          <Typography useGap={false} weight={500} style={{ display: 'inline' }}>
          On that day, I found him in a box near my home,{' '}
          <Typography useGap={false} weight={600} color={'var(--color-blue-700)'}>
            which
          </Typography>{' '}
          surprised me.
          </Typography>
        </Box>
      </Question>
      <Question size='small' type='dot'>
        <Box>
          <Typography useGap={false} weight={600} color={'var(--color-blue-700)'} style={{ display: 'inline' }}>
            Although
          </Typography>{' '}
          <Typography useGap={false} weight={500} style={{ display: 'inline' }}>
            I wasn’t sure if my family would allow me to take care of him, I brought him inside.
          </Typography>
        </Box>
      </Question>
      <Question size='small' type='dot'>
        <Box>
          <Typography useGap={false} weight={600} color={'var(--color-blue-700)'} style={{ display: 'inline' }}>
            While
          </Typography>{' '}
          <Typography useGap={false} weight={500} style={{ display: 'inline' }}>
            he rested in my room, I planned to ask my family if he could stay with us.
          </Typography>
        </Box>
      </Question>
    </>
  );
  
  const info: IHE01602Info = {
    text,
    altText: '상자 속에 있는 아기 고양이 한 마리',
    imageSrc: '/L03/C08/A07/HE2-L03-C08-A07-01.jpg',
  };

  return <HE01602 headerInfo={headerInfo} questionInfo={questionInfo} info={info} />;
};

export default P01;
