import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { L02C04A02 } from './store';

const P05 = () => {
  const PAGE_NAME = 'P05';
  const PAGE_KEY = PAGE_NAME.toLowerCase() as 'p05';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Weather Report',
  };
  const questionInfo = {
    text: 'Self-Check',
  };
  const list = [
    {
      title: '·',
      question: '날씨를 안내하고, 사람들의 행동을 묘사할 수 있나요?',
    },
    {
      title: '·',
      question: '날씨 정보를 일기 예보의 형식에 맞게 전달할 수 있나요?',
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
      ],
    },
  ];

  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const pageData = cardData[PAGE_KEY];
  const { answerList, isSubmitted } = pageData;
  const isCheckedAll = answerList?.every(data => !!data);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NAME)?.pageId;
    if (!pageId) return;

    const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
    initData(PAGE_NAME, userSubmissionList, defaultSubmission, isSubmitted);

    const inputData: inputDatasType[] = userSubmissionList?.[0]?.inputData;
    if (!inputData) return;

    const inputAnswer = inputData.map(data => data.value as string) || pageData.answerList;
    changeCardData({ answerList: inputAnswer, isSubmitted });
  };

  const changeCardData = (data: Partial<typeof cardData.p05>) => {
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], ...data } }));
  };

  const handleChange = (value: string, index: number) => {
    if (isSubmitted) return;

    const newAnswer = cardData[PAGE_KEY].answerList?.map((val, idx) => {
      if (idx === index) {
        const isChecked = val === value;
        return isChecked ? '' : value;
      } else return val;
    });
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answerList: newAnswer } }));
    changeData(PAGE_NAME, 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    if (cardData[PAGE_KEY].answerList === undefined) {
      return;
    }

    const submissionData: inputDatasType[] = cardData[PAGE_KEY].answerList.map((answer, index) => {
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
      vAlign='center'
      submitLabel={'완료하기'}
      submitBtnColor={isCheckedAll ? (isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isSubmitted || !isCheckedAll}
      onSubmit={handleSubmit}
    >
      <List data={list} gap={0}>
        {({ value, index = 1 }) => (
          <Box vAlign='baseline' justifyContent='space-between' useFull>
            <Typography color='var(--color-blue-700)' weight={700}>
              {value?.title}
            </Typography>
            <Box
              width='100%'
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
                  isActive={answerList?.[index - 1] === EChipButtonType.GOOD}
                  isDisabled={isSubmitted}
                  readOnly={cardData.p05.isSubmitted}
                  onClick={() => handleChange(EChipButtonType.GOOD, index - 1)}
                />
                <ChipButton
                  ariaLabel='보통'
                  size='32px'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.NOT_GOOD}
                  isActive={answerList?.[index - 1] === EChipButtonType.NOT_GOOD}
                  isDisabled={isSubmitted}
                  readOnly={cardData.p05.isSubmitted}
                  onClick={() => handleChange(EChipButtonType.NOT_GOOD, index - 1)}
                />
                <ChipButton
                  ariaLabel='나쁨'
                  size='32px'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.BAD}
                  isActive={answerList?.[index - 1] === EChipButtonType.BAD}
                  isDisabled={isSubmitted}
                  readOnly={cardData.p05.isSubmitted}
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
