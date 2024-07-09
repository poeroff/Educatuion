import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L02C09A03 } from './store';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    text: 'Self-Review',
    size: 'medium',
  };

  const list = useMemo(() => {
    return [
      {
        title: 'Content',
        question: '책에 대한 기본 정보와 자신의 감상을 구체적으로 표현했나요?',
        value: undefined,
      },
      {
        title: 'Organization',
        question: '독서 감상문의 구조에 따라 글을 전개했나요?',
        value: undefined,
      },
      {
        title: 'Language',
        question: '다양하고 적절한 어휘와 정확한 언어 형식을 사용했나요?',
        value: undefined,
      },
      {
        title: 'Ethics',
        question: '정보 윤리를 준수하여 글을 작성했나요?',
        value: undefined,
      },
    ];
  }, []);

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const submissionData: inputDatasType[] = cardData.p03.answer.map((answer, index) => {
      return {
        subKey: index + 1,
        type: 'TEXT',
        value: answer,
      };
    });
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: submissionData,
      },
    ];
    submitData('P03', userSubmission);
  };

  const handleChangeValue = (value: string, index: number) => {
    const newAnswer = cardData.p03.answer.map((val, idx) => (idx === index ? value : val));
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: newAnswer } }));
    changeData('P03', 1, index + 1, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData.map((item: inputDatasType) => item.value) || cardData.p03.answer,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={cardData.p03.isSubmitted || cardData.p03.answer.some(answer => !isNotEmptyString(answer))}
      submitBtnColor={
        cardData.p03.isSubmitted || cardData.p03.answer.some(answer => !isNotEmptyString(answer))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <List data={list} gap={0}>
        {({ value, index = 1 }) => (
          <Box vAlign='baseline' justifyContent='space-between' useFull>
            <Typography color='var(--color-blue-700)' weight={700}>
              {value?.title}
            </Typography>
            <Box
              width='75%'
              vAlign='baseline'
              justifyContent='space-between'
              gap='10px'
              padding='12px 0'
              borderBottom={index !== list.length ? '0.01em dashed var(--color-grey-200)' : 'none'}
            >
              <Typography>{value?.question}</Typography>
              <RadioWrap>
                <Box vAlign='center' justifyContent='space-between' gap='6px'>
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.GOOD}
                    isActive={cardData.p03.answer[index - 1] === EChipButtonType.GOOD}
                    size={'32px'}
                    onClick={() => handleChangeValue(EChipButtonType.GOOD, index - 1)}
                    ariaLabel='좋음'
                    readOnly={cardData.p03.isSubmitted}
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.NOT_GOOD}
                    isActive={cardData.p03.answer[index - 1] === EChipButtonType.NOT_GOOD}
                    size={'32px'}
                    onClick={() => handleChangeValue(EChipButtonType.NOT_GOOD, index - 1)}
                    ariaLabel='보통'
                    readOnly={cardData.p03.isSubmitted}
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.BAD}
                    isActive={cardData.p03.answer[index - 1] === EChipButtonType.BAD}
                    size={'32px'}
                    onClick={() => handleChangeValue(EChipButtonType.BAD, index - 1)}
                    ariaLabel='나쁨'
                    readOnly={cardData.p03.isSubmitted}
                  />
                </Box>
              </RadioWrap>
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

const RadioWrap = styled.div`
  input {
    appearance: none;
  }
`;

export default P03;
