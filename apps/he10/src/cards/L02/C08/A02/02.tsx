import { Box, TMainHeaderInfoTypes, Input, Typography, EStyleButtonTypes } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';

import styled from '@emotion/styled';

import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L02C08A02 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A02);

  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point1',
  };
  const questionInfo = {
    text: 'Discovering the Patterns',
  };

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    const isCorrect = true;

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={submitAnswer}
      submitLabel='완료하기'
      submitDisabled={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted}
    >
      <Box>
        <Box>
          <Box marginTop='20px' display='flex' flexDirection='column' gap='26px'>
            <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' height='30%' background='white' useRound>
              <Box hAlign={'flex-start'} tabIndex={101}>
                <GrammarChecker startRef={startRef1} endRef={endRef1}>
                  <StyledTypography>
                    The travelers didn’t know{' '}
                    <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                      how
                    </HighlightedWord>{' '}
                    <HighlightedWord color='var(--color-blue-900)' title='파란색 글자'>
                      far
                    </HighlightedWord>{' '}
                    <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                      the mountain shelter was
                    </HighlightedWord>
                    , but they kept walking.
                  </StyledTypography>
                </GrammarChecker>
              </Box>
              <Box hAlign={'flex-start'} tabIndex={102}>
                <GrammarChecker startRef={startRef2} endRef={endRef2}>
                  <StyledTypography>
                    People were amazed at{' '}
                    <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                      how
                    </HighlightedWord>{' '}
                    <HighlightedWord color='var(--color-green-900)' title='초록색 글자'>
                      skillfully
                    </HighlightedWord>{' '}
                    <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                      the young girl could do
                    </HighlightedWord>{' '}
                    taekwondo.
                  </StyledTypography>
                </GrammarChecker>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box marginTop='20px'>
          <Box tabIndex={103}>
            <Typography>Check the word order after “how” and identify the difference between the blue words and the green word.</Typography>
          </Box>
          <Box marginTop={'8px'}>
            <Input
              width='100%'
              maxLength={100}
              placeholder={'내용을 넣어 주세요.'}
              ariaLabel={'답란'}
              value={cardData.p02.answer}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;

const StyledTypography = styled(Typography)`
  display: block;
  max-width: 100%;
  color: var(--color-gray-800) !important;
`;

const HighlightedWord = styled.span<{ color: string }>`
  font-weight: var(--font-weight-bold);
  color: ${({ color }) => color};
  display: inline-block;
  position: relative;
`;
