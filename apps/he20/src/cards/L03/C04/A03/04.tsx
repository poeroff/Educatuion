import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  EStyleFontSizes,
  List,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C04A03 } from './store';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C04A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Self Review',
  };

  const questionInfo = {
    text: 'Review your own presentation',
  };

  const questionList = [
    {
      title: 'Content',
      question: '박물관의 주제와 전시물, 관람 시 유의 사항에 관한 정보를 포함했나요?',
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
      title: 'Visual Aid',
      question: '관람객의 호기심을 자극할 만한 영상을 만들었나요?',
    },
    {
      title: 'Attitude',
      question: '청중과 상호 작용하며 자신감 있는 자세로 발표했나요?',
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
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList?.length > 0) {
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
    const updatedAnswers = (cardData.p04.answer as string[])?.map((ans, idx) => (idx === index ? (ans && ans === value ? '' : value) : ans));
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={
        cardData.p04.isSubmitted || !(cardData.p04.answer as string[])?.every(value => value)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p04.isSubmitted || !(cardData.p04.answer as string[])?.every(value => value)}
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
                borderBottom={(index === 5 && '0') || '1px dotted #E0E2E6'}
              >
                <Box width='75%'>
                  <Typography size={EStyleFontSizes.SMALL} useGap={false}>
                    {value?.question}
                  </Typography>
                </Box>
                <Box width='20%'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.GOOD}
                      size={'36px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p04.isSubmitted}
                      ariaLabel='좋음'
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.NOT_GOOD}
                      size={'36px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p04.isSubmitted}
                      ariaLabel='보통'
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.BAD}
                      size={'36px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p04.isSubmitted}
                      ariaLabel='나쁨'
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
