import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C04A03, getUserSubmissionStore04 } from './store';
import { getUserSubmission } from '@maidt-cntn/api';

const PAGE = 'P04';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A03);
  const defaultSubmission = getUserSubmissionStore04(['', '', '', '']);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Self Review',
  };

  const questionInfo = {
    text: 'Review your own presentation',
  };

  const questionList = [
    {
      title: 'Content',
      question: '반려동물의 특성에 맞는 돌봄 방법을 제시했나요?',
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
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (value: string, index: number) => {
    const updatedAnswers = cardData.p04.answer?.map((ans, idx) => (idx === index ? (ans && ans === value ? '' : value) : ans));
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer: updatedAnswers,
      },
    }));
    changeData(PAGE, 1, 1, updatedAnswers);
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
    submitData(PAGE, getUserSubmissionStore04(cardData.p04.answer ?? ['', '', '', '']));
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
    if (cardData.p04.isSubmitted || !cardData.p04.answer?.every(val => val)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p04]);

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
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='22px' useFull>
            <Box width='15%'>
              <Typography color={'#124899'} useGap={false}>
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
                <Box width='80%'>{value?.question}</Box>
                <Box width='20%' alignSelf='center'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={cardData.p04.answer![index - 1] === EChipButtonType.GOOD}
                      size={'28px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel={`${index}번째 좋음 버튼`}
                      readOnly={cardData.p04.isSubmitted}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={cardData.p04.answer![index - 1] === EChipButtonType.NOT_GOOD}
                      size={'28px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel={`${index}번째 보통 버튼`}
                      readOnly={cardData.p04.isSubmitted}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={cardData.p04.answer![index - 1] === EChipButtonType.BAD}
                      size={'28px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      ariaLabel={`${index}번째 나쁨 버튼`}
                      readOnly={cardData.p04.isSubmitted}
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

export default P04;
