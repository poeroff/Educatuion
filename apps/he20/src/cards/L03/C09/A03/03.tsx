import { Box, BoxWrap, ChipButton, EChipButtonType, List, TMainHeaderInfoTypes, Typography, EStyleButtonTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C09A03 } from './store';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const questionInfo = {
    text: 'Self-Review',
  };

  const questionList = [
    {
      title: 'Content',
      question: '예술가의 역경과 업적을 구체적으로 포함했나요?',
    },
    {
      title: 'Organization',
      question: '전기문의 구조에 따라 글을 전개했나요?',
    },
    {
      title: 'Language',
      question: '다양하고 적절한 어휘와 정확한 언어 형식을 사용했나요?',
    },
    {
      title: 'Ethics',
      question: '정보 윤리를 준수하여 글을 작성했나요?',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', ''],
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

  const handleChangeValue = (value: string, index: number) => {
    const updatedAnswers = cardData.p03.answer.map((ans, idx) => (idx === index ? value : ans));
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
    return cardData.p03.answer.some(val => val === '');
  };

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
      <List data={questionList} gap={20}>
        {({ value, index = 0 }) => (
          <BoxWrap tabIndex={201} alignItems='start' justifyContent='space-between' marginTop='24px' useFull>
            <Box width='20%'>
              <Typography key={Number(`1${index}1`)} color='var(--color-blue-700)' weight='var(--font-weight-bold)'>
                {value?.title}
              </Typography>
            </Box>
            <Box width='80%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingBottom='20px'
                borderBottom={(index === 4 && '0') || '1px dotted #E0E2E6'}
              >
                <Box width='75%'>{value?.question}</Box>
                <Box width='20%'>
                  <BoxWrap>
                    <ChipButton
                      key={Number(`1${index}2`)}
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={cardData.p03.answer[index - 1] === EChipButtonType.GOOD}
                      size={'40px'}
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
                      isActive={cardData.p03.answer[index - 1] === EChipButtonType.NOT_GOOD}
                      size={'40px'}
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
                      isActive={cardData.p03.answer[index - 1] === EChipButtonType.BAD}
                      size={'40px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel='나쁨'
                      readOnly={cardData.p03.isSubmitted}
                    />
                  </BoxWrap>
                </Box>
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P03;
