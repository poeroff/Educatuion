import { L01C09A03 } from '@/cards/L01/C09/A03/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

interface IData {
  title: string;
  question: string;
}

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const questionInfo = {
    text: 'Self-Review',
  };

  const [list, setList] = useState<IData[]>([
    {
      title: 'Content',
      question: '자원봉사 지원서 항목에 해당하는 내용을 구체적으로 제시했나요?',
    },
    {
      title: 'Organization',
      question: '자원봉사 지원서 양식에 맞게 글을 작성했나요?',
    },
    {
      title: 'Language',
      question: '다양하고 적절한 어휘와 정확한 언어 형식을 사용했나요?',
    },
    {
      title: 'Ethics',
      question: '정보 윤리를 준수하여 글을 작성했나요?',
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
      ],
    },
    {
      mainKey: 2,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
    {
      mainKey: 3,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
    {
      mainKey: 4,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleChangeValue = (value: string, index: number) => {
    setCardData(prev => {
      const _p03 = { ...prev.p03 };
      _p03[`answer${index}`] = _p03[`answer${index}`] === value ? '' : value;
      return { ...prev, p03: { ..._p03 } };
    });
    changeData('P03', index, 1, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer4,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitText = () => {
    if (cardData.p03.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
            },
          ],
        },
        {
          mainKey: 2,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer2,
            },
          ],
        },
        {
          mainKey: 3,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer3,
            },
          ],
        },
        {
          mainKey: 4,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer4,
            },
          ],
        },
      ];
      submitData('P03', userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const checkAnswers =
    isNotEmptyString(cardData.p03.answer1) &&
    isNotEmptyString(cardData.p03.answer2) &&
    isNotEmptyString(cardData.p03.answer3) &&
    isNotEmptyString(cardData.p03.answer4);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !checkAnswers || cardData.p03.isSubmitted ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={'완료하기'}
      submitDisabled={!checkAnswers || cardData.p03.isSubmitted}
      onSubmit={onSubmitText}
      vAlign='flex-start'
    >
      <List data={list} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' useFull>
            <Box tabIndex={100 + 10 * index + index} width='20%'>
              <Typography color={'var(--color-blue-700)'}>{value?.title}</Typography>
            </Box>
            <Box width='80%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingBottom='20px'
                borderBottom={(index === 4 && '0') || '1px dotted var(--color-grey-200)'}
              >
                <Box tabIndex={100 + 10 * index + index + 1} width='75%'>
                  {value?.question}
                </Box>
                <Box width='20%'>
                  <RadioWrap>
                    <BoxWrap>
                      <ChipButton
                        tabIndex={100 + 10 * index + index + 2}
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.GOOD}
                        isActive={cardData.p03[`answer${index}`].toString() === EChipButtonType.GOOD}
                        size={'48px'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                          handleChangeValue((e.target as HTMLInputElement).value, index)
                        }
                        readOnly={cardData.p03.isSubmitted}
                      />
                      <ChipButton
                        tabIndex={100 + 10 * index + index + 3}
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.NOT_GOOD}
                        isActive={cardData.p03[`answer${index}`].toString() === EChipButtonType.NOT_GOOD}
                        size={'48px'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                          handleChangeValue((e.target as HTMLInputElement).value, index)
                        }
                        readOnly={cardData.p03.isSubmitted}
                      />
                      <ChipButton
                        tabIndex={100 + 10 * index + index + 4}
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.BAD}
                        isActive={cardData.p03[`answer${index}`].toString() === EChipButtonType.BAD}
                        size={'48px'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                          handleChangeValue((e.target as HTMLInputElement).value, index)
                        }
                        readOnly={cardData.p03.isSubmitted}
                      />
                    </BoxWrap>
                  </RadioWrap>
                </Box>
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

const RadioWrap = styled.div`
  input {
    appearance: none;
  }
`;

export default P03;
