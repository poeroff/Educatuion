import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { L01C10A02, L01C10A02HeaderInfo } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IData {
  question: string;
  value: string | undefined;
}

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C10A02);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            Self-Check
          </Typography>
        </Box>
      </>
    ),
  };

  const [list, setList] = useState<IData[]>([
    {
      question: '학교생활을 잘 정리해서 소개할 수 있나요?',
      value: undefined,
    },
    {
      question: '좋아하는 것을 명확하게 표현할 수 있나요?',
      value: undefined,
    },
  ]);

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
      if (userSubmissionList.length > 0) {
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
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? value : ans));

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData('P03', 1, 1, cardData.p03.answer);
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

  const checkDisableInput = () => {
    return cardData.p03.answer?.some(val => val === '');
  };

  return (
    <Container
      headerInfo={L01C10A02HeaderInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={cardData.p03.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p03.isSubmitted || checkDisableInput()}
      onSubmit={submitAnswer}
    >
      <List data={list} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' boxGap={8} useFull>
            <Box width='100%'>
              <BoxWrap justifyContent='space-between' paddingBottom='40px' borderBottom={(index === 4 && '0') || '1px dotted var(--color-grey-200)'}>
                <Box width='85%' vAlign='center'>
                  <Circle />
                  <Typography color='var(--color-grey-900)'>{value?.question}</Typography>
                </Box>
                <Box width='15%' vAlign='center'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      key={`1${index}2`}
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={cardData.p03.answer[index - 1] === EChipButtonType.GOOD}
                      size={'32px'}
                      ariaLabel='좋음'
                      readOnly={cardData.p03.isSubmitted}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                    />
                    <ChipButton
                      type='radio'
                      key={`1${index}3`}
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={cardData.p03.answer[index - 1] === EChipButtonType.NOT_GOOD}
                      size={'32px'}
                      ariaLabel='보통'
                      readOnly={cardData.p03.isSubmitted}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                    />
                    <ChipButton
                      type='radio'
                      key={`1${index}4`}
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={cardData.p03.answer[index - 1] === EChipButtonType.BAD}
                      size={'32px'}
                      ariaLabel='나쁨'
                      readOnly={cardData.p03.isSubmitted}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
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

const Circle = styled.div`
  margin: 16px;

  border-radius: 50%;
  background-color: var(--color-blue-700);

  position: relative;
  min-width: inherit !important;
  min-height: inherit !important;
  width: 10px !important;
  height: 10px !important;
`;
