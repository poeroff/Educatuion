import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C07A04 } from './store';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };

  const questionInfo = {
    text: 'Self-Review',
  };

  const questionList = [
    {
      title: 'Input Reception',
      question: '소설 《Gathering of the Whakapapa》를 읽고\n작가의 의도와 글의 흐름 및 등장인물의 심경을\n파악했나요?',
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
      if (userSubmissionList?.length > 0) {
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
    const updatedAnswers = (cardData.p03.answer as string[])?.map((ans, idx) => (idx === index ? (ans && ans === value ? '' : value) : ans));
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={
        cardData.p03.isSubmitted || !(cardData.p03.answer as string[])?.every(value => value)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p03.isSubmitted || !(cardData.p03.answer as string[])?.every(value => value)}
      vAlign='flex-start'
      onSubmit={submitAnswer}
    >
      <List data={questionList} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' useFull>
            <Box width='20%'>
              <Typography weight={700} color={'#124899'} useGap={false}>
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
                <Box width='75%'>
                  <Typography useGap={false}>{value?.question}</Typography>
                </Box>
                <Box width='20%'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={cardData.p03.answer?.[index - 1] === EChipButtonType.GOOD}
                      size={'36px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p03.isSubmitted}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={cardData.p03.answer?.[index - 1] === EChipButtonType.NOT_GOOD}
                      size={'36px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p03.isSubmitted}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={cardData.p03.answer?.[index - 1] === EChipButtonType.BAD}
                      size={'36px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
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
