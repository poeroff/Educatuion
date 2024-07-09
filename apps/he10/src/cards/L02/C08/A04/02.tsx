import { Box, TMainHeaderInfoTypes, TextView, Input, Typography, Image, EStyleButtonTypes, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };
  const questionInfo = {
    text: 'Discovering The Patterns',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
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
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    const value = truncateToMaxBytes(event.target.value);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData('P02', 1, 1, value);
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
      onSubmit={submitAnswer}
      submitLabel='완료하기'
      submitDisabled={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted}
      submitBtnColor={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <PinchZoom>
              <Image
                src={'/L02/C08/A04/HE1-L02-C08-A04.jpg'}
                width={'811px'}
                alt='I felt as if people from the past were looking over the shoulders of the old men. I felt가 다른 퍼즐로 분리되어 있으며 as if 와 were이 빨간 색자로 강조되어 있다.'
              />
            </PinchZoom>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          <Box hAlign={'flex-start'}>
            <StyledTypography>
              <TextPartRight>What does "as if" mean, and when is it used?</TextPartRight>
            </StyledTypography>
          </Box>
          <Box hAlign={'flex-start'}>
            <StyledTypography>
              <Input
                width='850px'
                textAlign='start'
                placeholder={'내용을 넣어 주세요.'}
                value={cardData.p02.answer}
                onChange={handleInputOnChange}
                maxLength={2000}
                aria-label='답란'
                readOnly={cardData.p02.isSubmitted}
              />
            </StyledTypography>
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
`;
const TextPartRight = styled.span`
  display: inline;
  padding-right: 12px;
`;
