import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, TMainHeaderInfoTypes, Input, Typography, EStyleButtonTypes } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C08A02 } from './store';
import styled from '@emotion/styled';

import { useRef, useState, useEffect } from 'react';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A02);
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point1',
  };
  const questionInfo = {
    text: 'Discovering The Patterns',
    // mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  // const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
  //   setInputValue(event.target.value);
  // };

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

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      // const isCorrect = cardData.p02.answer.trim() === cardData.p02.solution;
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
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
    // eslint-disable-next-line
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitBtnColor={
        !cardData.p02.answer || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={() => {
        setShow(!isShow);
        onGrade();
      }}
      submitLabel='완료하기'
      submitDisabled={!cardData.p02.answer || cardData.p02.isSubmitted}
    >
      <Box>
        <Box marginTop='20px' display='flex' flexDirection='column' gap='26px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' height='30%' background='white' useRound>
            <Box hAlign={'flex-start'} tabIndex={101}>
              <GrammarChecker startRef={startRef1} endRef={endRef1}>
                <StyledTypography>
                  On Sports Day, I ran as fast as I could,{' '}
                  <HighlightedWord title='빨간색 글자' color='var(--color-red-800)'>
                    with
                  </HighlightedWord>{' '}
                  all my classmates{' '}
                  <HighlightedWord title='파란색 글자' color='var(--color-blue-900)'>
                    encouraging
                  </HighlightedWord>{' '}
                  me.
                </StyledTypography>
              </GrammarChecker>
            </Box>
            <Box hAlign={'flex-start'} tabIndex={102}>
              <GrammarChecker startRef={startRef2} endRef={endRef2}>
                <StyledTypography>
                  Judy walked out of the library{' '}
                  <HighlightedWord title='빨간색 글자' color='var(--color-red-800)'>
                    with
                  </HighlightedWord>{' '}
                  all my classmates{' '}
                  <HighlightedWord title='초록색 글자' color='var(--color-green-900)'>
                    filled
                  </HighlightedWord>{' '}
                  with books.
                </StyledTypography>
              </GrammarChecker>
            </Box>
          </Box>
        </Box>
        <Box marginTop='20px'>
          <Box hAlign={'flex-start'}>
            <Box tabIndex={103}>
              <StyledTypography>
                <TextPartRight>What is the function of “with” and how do the blue words differ from the green word?</TextPartRight>
              </StyledTypography>
            </Box>
          </Box>
          <Box hAlign={'flex-start'} marginTop={'8px'}>
            <Input
              width='100%'
              placeholder={'내용을 넣어 주세요.'}
              ariaLabel={'답란'}
              textAlign='left'
              value={cardData.p02.answer}
              readOnly={cardData.p02.isSubmitted}
              onChange={event => handleChange(1, event.target.value)}
              maxLength={999}
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

const TextPartRight = styled.span`
  display: inline;
  padding-right: 12px;
`;
