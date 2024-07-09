import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo } from 'react';
import { L01C07A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo: IQuestionProps = {
    text: 'Self-Review',
  };

  const list = useMemo(() => {
    return [
      {
        title: 'Input Reception',
        question: '다정함이 생존과 성공에 미치는 영향에 관한 강연 글을 읽고 주제와 세부 내용을 파악했나요?',
      },
      {
        title: 'Output Production',
        question: '글의 주제와 관련하여 자신의 생각을 구체적으로 표현했나요?',
      },
    ];
  }, []);

  const { userId } = useRecoilValue(studentAtom);
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

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
    const submissionData: inputDatasType[] = cardData.p04.answer!.map((answer, index) => {
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
    submitData('P04', userSubmission);
  };

  const handleChangeValue = (value: string, index: number) => {
    const newAnswer = cardData.p04.answer?.map((val, idx) => (idx === index ? value : val));
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: newAnswer } }));
    changeData('P04', 1, index + 1, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData.map((item: inputDatasType) => item.value) || cardData.p04.answer,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={cardData.p04.isSubmitted || cardData.p04.answer?.some(answer => !isNotEmptyString(answer))}
      submitBtnColor={
        cardData.p04.isSubmitted || cardData.p04.answer?.some(answer => !isNotEmptyString(answer))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <List data={list} gap={0}>
        {({ value, index = 1 }) => (
          <Box vAlign='baseline' justifyContent='space-between' useFull>
            <Typography color='var(--color-blue-700)' weight={700} width='24%'>
              {value?.title}
            </Typography>
            <Box
              width='76%'
              vAlign='baseline'
              justifyContent='space-between'
              gap='10px'
              padding='12px 0'
              borderBottom={index !== list.length ? '0.01em dashed var(--color-grey-200)' : 'none'}
            >
              <Typography>{value?.question}</Typography>
              <Box vAlign='center' justifyContent='space-between' gap='6px'>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.GOOD}
                  isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.GOOD}
                  size={'32px'}
                  onClick={() => handleChangeValue(EChipButtonType.GOOD, index - 1)}
                  ariaLabel='좋음'
                  readOnly={cardData.p04.isSubmitted}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.NOT_GOOD}
                  isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.NOT_GOOD}
                  size={'32px'}
                  onClick={() => handleChangeValue(EChipButtonType.NOT_GOOD, index - 1)}
                  ariaLabel='보통'
                  readOnly={cardData.p04.isSubmitted}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.BAD}
                  isActive={cardData.p04.answer?.[index - 1] === EChipButtonType.BAD}
                  size={'32px'}
                  onClick={() => handleChangeValue(EChipButtonType.BAD, index - 1)}
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
