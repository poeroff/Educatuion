import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  BoxWrap,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  IQuestionProps,
  Label,
  List,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L07C04A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L07C04A02);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'About Animals',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Typography fontSize='32px' lineHeight='50px' weight='var(--font-weight-extraBold)' useGap={false}>
          Self-Check
        </Typography>
      </>
    ),
  };

  const questionList = [
    {
      question: '적절한 매체를 이용하여 동물의 정보를 찾을 수 있나요?',
    },
    {
      question: '조사한 내용을 모두 잘 정리하여 발표할 수 있나요?',
    },
  ];

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

  const checkDisableInput = () => {
    return !cardData.p04.answer?.every(val => val);
  };

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

  const handleSubmit = () => {
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
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      submitBtnColor={cardData.p04.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p04.isSubmitted || checkDisableInput()}
    >
      <Box vAlign='center' useFull>
        <List data={questionList} gap={0}>
          {({ value, index = 0 }) => (
            <BoxWrap alignItems='center' justifyContent='center' boxGap={8} useFull>
              <Box vAlign='center'>
                <Label type={'paint'} size={'xx-small'} background='var(--color-blue-500)' />
              </Box>
              <Box
                width='90%'
                vAlign='center'
                justifyContent='space-between'
                padding='12px 0'
                borderBottom={index !== questionList.length ? '0.01em dashed var(--color-grey-200)' : 'none'}
              >
                <Box>
                  <Typography>{value?.question}</Typography>
                </Box>
                <Box vAlign='center' justifyContent='space-between'>
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
                    ariaLabel={index + '번째 좋음 버튼'}
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
                    ariaLabel={index + '번째 보통 버튼'}
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
                    ariaLabel={index + '번째 나쁨 버튼'}
                    readOnly={cardData.p04.isSubmitted}
                  />
                </Box>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P04;
