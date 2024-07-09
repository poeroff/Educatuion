import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, Typography, SvgIcon, EStyleButtonTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Stamp, EStampType, Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0008_06 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/header_star.svg';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0008_06);
  const { userId } = useRecoilValue(studentAtom);
  const currentPage = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box hAlign='center'>
        <SvgIcon src={headerIcon} size='34px' />
        <Typography fontSize='20px'> 이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.</Typography>
      </Box>
    ),
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
        },
      ],
    },
  ];

  const handleRadio = (index: number) => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer,
          },
        ],
      },
    ];
    submitData(currentPage, userSubmission);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId || 1;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitBtnColor={
        cardData.p01.isSubmitted ? EStyleButtonTypes.GRAY : cardData.p01.answer === -1 ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW
      }
      submitLabel='완료하기'
      submitDisabled={cardData.p01.isSubmitted || cardData.p01.answer === -1}
      onSubmit={handleSubmit}
      useRound
    >
      <Box hAlign='center'>
        <Typography weight={'var(--font-weight-semiBold)'}>이번 시간에 공부한 내용을 잘 이해했나요?</Typography>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Box hAlign='center' marginRight='144px'>
          <Stamp
            isClicked={cardData.p01.answer === 0}
            ariaLabel='잘 이해했습니다.'
            onClick={() => handleRadio(0)}
            stampType={EStampType.O}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
        <Box hAlign='center'>
          <Stamp
            isClicked={cardData.p01.answer === 1}
            ariaLabel='잘 이해하지 못했습니다.'
            onClick={() => handleRadio(1)}
            stampType={EStampType.X}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P01;

const Text = styled(Typography)`
  font-size: var(--font-size-36);
`;
