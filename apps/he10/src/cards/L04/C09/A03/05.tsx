import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C09A03 } from './store';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';

const P05 = () => {
  const pageNumber = 'P05';
  const pageKey = pageNumber.toLowerCase() as 'p05';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };
  const questionInfo = {
    text: 'Self-Review',
  };
  const list = [
    {
      title: 'Content',
      question: '그래프를 설명하는 글의 내용이 그래프 자료와 일치하나요?',
    },
    {
      title: 'Organization',
      question: '그래프를 설명하는 글의 구조에 따라 글을 전개했나요?',
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

  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C09A03);
  const cardPageData = cardData[pageKey];
  const { answer, isSubmitted } = cardPageData;
  const isSubmitAvailable = answer.every(data => !!data);
  const submitBtnColor = !isSubmitted && isSubmitAvailable ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (!pageId) return;

    const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
    initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);

    const inputData: inputDatasType[] = userSubmissionList?.[0]?.inputData;
    if (!inputData) return;

    const inputAnswer = inputData.map(data => data.value as string) || cardPageData.answer;
    changeCardData({ answer: inputAnswer, isSubmitted });
  };

  const changeCardData = (data: Partial<typeof cardData.p05>) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], ...data } }));
  };

  const handleChange = (value: string, index: number) => {
    if (isSubmitted) return;

    const newAnswer = cardData[pageKey].answer.map((val, idx) => {
      if (idx === index) {
        const isChecked = val === value;
        return isChecked ? '' : value;
      } else return val;
    });
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newAnswer } }));
    changeData(pageNumber, 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    const submissionData: inputDatasType[] = cardData[pageKey].answer.map((answer, index) => {
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

    submitData(pageNumber, userSubmission);
    changeCardData({ isSubmitted: true });
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }

    return () => {
      saveData(pageNumber);
    };
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={'완료하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitted || !isSubmitAvailable}
      onSubmit={handleSubmit}
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
              <Box vAlign='center' justifyContent='space-between' gap='16px'>
                <ChipButton
                  ariaLabel='좋음'
                  size='32px'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.GOOD}
                  isActive={answer[index - 1] === EChipButtonType.GOOD}
                  isDisabled={isSubmitted}
                  onClick={() => handleChange(EChipButtonType.GOOD, index - 1)}
                />
                <ChipButton
                  ariaLabel='보통'
                  size='32px'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.NOT_GOOD}
                  isActive={answer[index - 1] === EChipButtonType.NOT_GOOD}
                  isDisabled={isSubmitted}
                  onClick={() => handleChange(EChipButtonType.NOT_GOOD, index - 1)}
                />
                <ChipButton
                  ariaLabel='나쁨'
                  size='32px'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.BAD}
                  isActive={answer[index - 1] === EChipButtonType.BAD}
                  isDisabled={isSubmitted}
                  onClick={() => handleChange(EChipButtonType.BAD, index - 1)}
                />
              </Box>
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default P05;
