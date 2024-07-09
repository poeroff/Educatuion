import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { L03C09A03 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';

interface IData {
  title: string;
  question: string;
  value: string | undefined;
}

const P06 = () => {
  const PAGE_NAME = 'P06';
  const PAGE_KEY = PAGE_NAME.toLowerCase() as 'p06';
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const pageData = cardData[PAGE_KEY];
  const { answer, isSubmitted } = pageData;
  const isCheckedAll = answer.every(data => !!data);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const questionInfo = {
    text: 'Self-Review',
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const [list, setList] = useState<IData[]>([
    {
      title: 'Content',
      question: '과학 실험의 목적, 준비물, 절차, 예상 결과와 이유를 구체적으로 설명했나요?',
      value: undefined,
    },
    {
      title: 'Organization',
      question: '과학 실험을 설명하는 글의 양식에 맞게 글을 전개했나요?',
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
  ]);

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NAME)?.pageId;
    if (!pageId) return;

    const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
    initData(PAGE_NAME, userSubmissionList, defaultSubmission, isSubmitted);

    const inputData: inputDatasType[] = userSubmissionList?.[0]?.inputData;
    if (!inputData) return;

    const inputAnswer = inputData.map(data => data.value as string) || pageData.answer;
    changeCardData({ answer: inputAnswer, isSubmitted });
  };

  const changeCardData = (data: Partial<typeof cardData.p06>) => {
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], ...data } }));
  };

  const handleChange = (value: string, index: number) => {
    if (isSubmitted) return;

    const newAnswer = cardData[PAGE_KEY].answer.map((val, idx) => {
      if (idx === index) {
        const isChecked = val === value;
        return isChecked ? '' : value;
      } else return val;
    });
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answer: newAnswer } }));
    changeData(PAGE_NAME, 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    const submissionData: inputDatasType[] = cardData[PAGE_KEY].answer.map((answer, index) => {
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

    submitData(PAGE_NAME, userSubmission);
    changeCardData({ isSubmitted: true });
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }

    return () => {
      saveData(PAGE_NAME);
    };
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      submitBtnColor={isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitted || !isCheckedAll}
      onSubmit={handleSubmit}
    >
      <List data={list} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' boxGap={8} useFull>
            <Box width='160px'>
              <Typography color={'var(--color-blue-900)'} weight='var(--font-weight-bold)'>
                {value?.title}
              </Typography>
            </Box>
            <Box width='80%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingBottom='20px'
                boxGap={8}
                borderBottom={(index === 4 && '0') || '1px dotted var(--color-grey-200)'}
              >
                <Box width='75%'>{value?.question}</Box>
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
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P06;
