import { TMainHeaderInfoTypes, Typography, Input, Box, List, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect } from 'react';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C04A03 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A03);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 1. Think and Plan',
  };

  const questionInfo = {
    text: 'Answer the questions to prepare for your speech.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel='완료하기'
      submitBtnColor={cardData.p01.isSubmitted || !cardData.p01.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p01.isSubmitted || !cardData.p01.answer?.every(val => val)}
    >
      <List data={cardData.p01.contents!} gap={20}>
        {({ value: item, index = 0 }) => (
          <Box>
            <Typography>
              {index}. {item}
            </Typography>
            <Box marginTop={'8px'} paddingLeft={'40px'}>
              <Input
                width='100%'
                value={cardData.p01.answer?.[index - 1]}
                textAlign='left'
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(index - 1, e.target.value)}
                maxLength={100}
                ariaLabel={`${index + 1}번 답 입력란`}
              />
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default P01;
