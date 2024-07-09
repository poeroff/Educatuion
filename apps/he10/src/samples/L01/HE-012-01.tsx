import { Box, BoxWrap, ChipButton, EChipButtonType, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IData {
  title: string;
  question: string;
  value: string | undefined;
}

const HE01201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Self Review',
  };

  const questionInfo = {
    text: 'Review your own presentation',
  };

  const [list, setList] = useState<IData[]>([
    {
      title: 'Content',
      question: '신입생으로서의 어려움과 해결 방안을 구체적으로 이야기했나요?',
      value: undefined,
    },
    {
      title: 'Fluency',
      question: '자연스러운 발음, 억양, 속도로 유창하게 말했나요?',
      value: undefined,
    },
    {
      title: 'Language',
      question: '다양하고 적절한 어휘와 정확한 언어 형식을 사용했나요?',
      value: undefined,
    },
    {
      title: 'Attitude',
      question: '청중과 상호작용하며 자신감 있는 자세로 발표했나요?',
      value: undefined,
    },
  ]);

  const handleChangeValue = (value: string, index?: number) => {
    setList(data => data?.map((val, idx) => (idx === index ? { ...val, value: value } : val)));
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
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
                <Box width='20%'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={value?.value === EChipButtonType.GOOD}
                      size={'38px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={value?.value === EChipButtonType.NOT_GOOD}
                      size={'38px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={value?.value === EChipButtonType.BAD}
                      size={'38px'}
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

export default HE01201;
