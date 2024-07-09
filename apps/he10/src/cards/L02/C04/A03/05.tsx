import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C04A03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Self-Review',
  };

  const questionInfo: IQuestionProps = {
    text: 'Review your own interview.',
    size: 'medium',
  };

  const questionList = [
    {
      title: 'Content',
      question: '작가의 대표작에 관해 묻고 답하는 내용으로 인터뷰를 구성했나요?',
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
      question: '짝과 함께 자신감 있는 자세로 역할극을 수행했나요?',
    },
  ];

  const handleChangeValue = (value: string, index: number) => {
    const updatedAnswers = cardData.p05.answer?.map((ans, idx) => (idx === index ? (ans && ans === value ? '' : value) : ans));
    setCardData(prev => ({
      ...prev,
      p05: {
        ...prev.p05,
        answer: updatedAnswers,
      },
    }));
    changeData('P05', 1, 1, updatedAnswers);
  };

  const checkDisableInput = () => {
    return !cardData.p05.answer?.every(val => val);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
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
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p05.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P05', userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      submitBtnColor={cardData.p05.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p05.isSubmitted || checkDisableInput()}
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
                  isActive={cardData.p05.answer?.[index - 1] === EChipButtonType.GOOD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel={index + 1 + '번째 좋음 버튼'}
                  readOnly={cardData.p05.isSubmitted}
                />
                <ChipButton
                  key={Number(`1${index}3`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.NOT_GOOD}
                  isActive={cardData.p05.answer?.[index - 1] === EChipButtonType.NOT_GOOD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel={index + 1 + '번째 보통 버튼'}
                  readOnly={cardData.p05.isSubmitted}
                />
                <ChipButton
                  key={Number(`1${index}4`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.BAD}
                  isActive={cardData.p05.answer?.[index - 1] === EChipButtonType.BAD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel={index + 1 + '번째 나쁨 버튼'}
                  readOnly={cardData.p05.isSubmitted}
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
