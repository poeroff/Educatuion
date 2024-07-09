import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C07A04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };

  const questionInfo = {
    text: 'Self-Review',
  };

  const questionList = [
    {
      title: 'Input Reception',
      question: '역경을 극복한 예술가에 관한 글을 읽고 주제와 세부 내용을 파악했나요?',
    },
    {
      title: 'Output Production',
      question: '글의 내용과 관련하여 자신의 생각을 구체적으로 표현했나요?',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (value: string, index: number) => {
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData('P03', 1, 1, updatedAnswers);
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P03', userSubmission);
  };

  const checkDisableInput = () => {
    return cardData.p03.answer?.some(val => val === '');
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      submitBtnColor={cardData.p03.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p03.isSubmitted || checkDisableInput()}
      onSubmit={submitAnswer}
    >
      <List data={questionList} gap={0}>
        {({ value, index = 0 }) => (
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
              borderBottom={index !== questionList.length ? '0.01em dashed var(--color-grey-200)' : 'none'}
            >
              <Box>{value?.question}</Box>
              <Box vAlign='center' justifyContent='space-between' gap='6px'>
                <ChipButton
                  key={Number(`1${index}2`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.GOOD}
                  isActive={cardData.p03.answer?.[index - 1] === EChipButtonType.GOOD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel='좋음'
                  readOnly={cardData.p03.isSubmitted}
                />
                <ChipButton
                  key={Number(`1${index}3`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.NOT_GOOD}
                  isActive={cardData.p03.answer?.[index - 1] === EChipButtonType.NOT_GOOD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel='보통'
                  readOnly={cardData.p03.isSubmitted}
                />
                <ChipButton
                  key={Number(`1${index}4`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.BAD}
                  isActive={cardData.p03.answer?.[index - 1] === EChipButtonType.BAD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel='나쁨'
                  readOnly={cardData.p03.isSubmitted}
                />
              </Box>
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default P03;
