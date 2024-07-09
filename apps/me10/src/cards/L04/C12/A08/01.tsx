import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L04C12A08 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const [cardData, setCardData] = useRecoilState(L04C12A08);
  const [disabled, setDisabled] = useState<boolean>(true);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'checkYourself',
  };

  const questionInfo: IQuestionProps = {
    text: '',
  };

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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const loadData = cardData.p01.data.map((object, index) => {
          return { ...object, userAnswer: userSubmissionList[0].inputData[index]?.value || object.userAnswer };
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            data: loadData,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (value: string, index: number) => {
    const assignValue: string | undefined = cardData.p01.data.at(index)?.userAnswer === value ? undefined : value;
    const newData = [...cardData.p01.data];
    newData[index] = { ...cardData.p01.data[index], userAnswer: assignValue };
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, data: newData } }));
    changeData('P01', 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.data[0].userAnswer,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.data[1].userAnswer,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.data[2].userAnswer,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.data[3].userAnswer,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.data[4].userAnswer,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  useEffect(() => {
    setDisabled(cardData.p01.isSubmitted || cardData.p01.data?.some(val => !val?.userAnswer));
  }, [cardData.p01.isSubmitted, cardData.p01.data]);

  useEffect(() => {
    return () => {
      saveData('P01');
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
      submitBtnColor={disabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={disabled}
    >
      <List data={cardData.p01.data} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='20px' boxGap={8} useFull>
            <Box width='28%'>
              <Typography key={Number(`1${index}1`)} color={'var(--color-blue-700)'} weight='var(--font-weight-bold)'>
                {value?.title}
              </Typography>
            </Box>
            <Box width='72%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingTop='4px'
                paddingBottom='10px'
                boxGap={8}
                borderBottom={(index === 5 && '0') || '1px dotted var(--color-grey-200)'}
              >
                <Box width='75%'>{value?.contents}</Box>
                <Box width='20%'>
                  <BoxWrap>
                    <ChipButton
                      key={Number(`1${index}2`)}
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={value?.userAnswer === EChipButtonType.GOOD}
                      size={'38px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p01.isSubmitted}
                      ariaLabel='좋음'
                    />
                    <ChipButton
                      key={Number(`1${index}3`)}
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={value?.userAnswer === EChipButtonType.NOT_GOOD}
                      size={'38px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p01.isSubmitted}
                      ariaLabel='보통'
                    />
                    <ChipButton
                      key={Number(`1${index}4`)}
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={value?.userAnswer === EChipButtonType.BAD}
                      size={'38px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                      readOnly={cardData.p01.isSubmitted}
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

export default P01;
