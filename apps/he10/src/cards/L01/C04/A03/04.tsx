import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C04A03 } from './store';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A03);

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
      question: '신입생으로서의 어려움과 해결 방안을 구체적으로 이야기했나요?',
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
      question: '청중과 상호작용하며 자신감 있는 자세로 발표했나요?',
    },
  ];

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
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
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
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  const handleChangeValue = (value: string, index: number) => {
    const updatedAnswers = cardData.p04.answer?.map((ans, idx) => (idx === index ? (ans && ans === value ? '' : value) : ans));
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer: updatedAnswers,
      },
    }));
    changeData('P04', 1, 1, updatedAnswers);
  };

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p04.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P04', userSubmission);
  };

  const checkDisableInput = () => {
    return !cardData.p04.answer?.every(val => val);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      submitBtnColor={cardData.p04.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p04.isSubmitted || checkDisableInput()}
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
                  isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.GOOD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel='좋음'
                  readOnly={cardData.p04.isSubmitted}
                />
                <ChipButton
                  key={Number(`1${index}3`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.NOT_GOOD}
                  isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.NOT_GOOD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel='보통'
                  readOnly={cardData.p04.isSubmitted}
                />
                <ChipButton
                  key={Number(`1${index}4`)}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.BAD}
                  isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.BAD}
                  size={'32px'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                    handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                  }
                  ariaLabel='나쁨'
                  readOnly={cardData.p04.isSubmitted}
                />
              </Box>
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default P04;
