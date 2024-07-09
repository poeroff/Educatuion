import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C04A03, getUserSubmissionStore05 } from './store';
import { getUserSubmission } from '@maidt-cntn/api';

const PAGE = 'P05';

const P05 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C04A03);
  const defaultSubmission = getUserSubmissionStore05(['', '', '', '']);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Self Review',
  };

  const questionInfo = {
    text: 'Review your own news report.',
  };

  const questionList = [
    {
      title: 'Content',
      question: '환경에 긍정적인 영향을 주는 현상을 기사에 구체적으로 포함했나요?',
    },
    {
      title: 'Fluency',
      question: '자연스러운 발음, 억양, 속도로 유창하게 말했나요?',
    },
    {
      title: 'Language',
      question: '다양하고 적절한 어휘와 정확한 언어 형식을 사용했나요?',
    },
    {
      title: 'Attitude',
      question: '청중과 상호 작용하며 자신감 있는 자세로 발표했나요?',
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (value: string, index: number) => {
    const updatedAnswers = cardData.p05.answer?.map((ans, idx) => (idx === index ? (ans && ans === value ? '' : value) : ans));
    setCardData(prev => ({
      ...prev,
      p05: {
        ...prev.p05,
        answer: updatedAnswers,
      },
    }));
    changeData(PAGE, 1, 1, updatedAnswers);
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));
    submitData(PAGE, getUserSubmissionStore05(cardData.p05.answer ?? ['', '', '', '']));
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (cardData.p05.isSubmitted || !cardData.p05.answer?.every(val => val)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p05]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <List data={questionList} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' useFull>
            <Box width='15%'>
              <Typography color='var(--color-blue-600)' useGap={false}>
                {value?.title}
              </Typography>
            </Box>
            <Box width='85%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingBottom='20px'
                borderBottom={(index === 4 && '0') || '1px dotted #E0E2E6'}
              >
                <Box width='83%'>{value?.question}</Box>
                <Box width='17%' alignSelf='center'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={cardData.p05.answer![index - 1] === EChipButtonType.GOOD}
                      size={'28px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel={`${index}번째 좋음 버튼`}
                      readOnly={cardData.p05.isSubmitted}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={cardData.p05.answer![index - 1] === EChipButtonType.NOT_GOOD}
                      size={'28px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel={`${index}번째 보통 버튼`}
                      readOnly={cardData.p05.isSubmitted}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={cardData.p05.answer![index - 1] === EChipButtonType.BAD}
                      size={'28px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel={`${index}번째 나쁨 버튼`}
                      readOnly={cardData.p05.isSubmitted}
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

export default P05;
