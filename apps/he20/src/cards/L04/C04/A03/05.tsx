import { Box, BoxWrap, ChipButton, EChipButtonType, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';

interface IData {
  title: string;
  question: string;
  value: string | undefined;
  isChecked: boolean;
}

interface IP05 {
  isSubmitted: boolean;
  onSubmit: (val: boolean) => void;
}

const P05 = ({ isSubmitted, onSubmit }: IP05) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Self Review',
  };

  const questionInfo = {
    text: 'Review your own news report.',
  };

  const [list, setList] = useState<IData[]>([
    {
      title: 'Content',
      question: 'AI 기술의 발전과 그에 따른 사회 변화에 대한 자신의 의견과 근거를 포함했나요 ?',
      value: undefined,
      isChecked: false,
    },
    {
      title: 'Fluency',
      question: '자연스러운 발음, 억양, 속도로 유창하게 말했나요?',
      value: undefined,
      isChecked: false,
    },
    {
      title: 'Language',
      question: '다양하고 적절한 어휘와 정확한 언어 형식을 사용했나요?',
      value: undefined,
      isChecked: false,
    },
    {
      title: 'Attitude',
      question: '상대방의 의견을 존중하면서 자신의 의견을 제시했나요?',
      value: undefined,
      isChecked: false,
    },
  ]);

  const handleChangeValue = (value: string, index?: number) => {
    setList(data => data.map((val, idx) => (idx === index ? { ...val, value: value, isChecked: !val.isChecked } : val)));
    console.log(list);
  };

  useEffect(() => {
    setIsDisabled(isSubmitted || list.some(val => !val.isChecked));
  }, [isSubmitted, list]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={isDisabled}
      onSubmit={() => {
        onSubmit(true);
      }}
      submitLabel='완료하기'
      vAlign='flex-start'
    >
      <List data={list} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='22px' useFull>
            <Box width='15%'>
              <Typography color={'#124899'}>{value?.title}</Typography>
            </Box>
            <Box width='90%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingBottom='20px'
                borderBottom={(index === 4 && '0') || '1px dotted #E0E2E6'}
              >
                <Box width='90%' fontSize={23}>
                  {value?.question}
                </Box>
                <Box width='20%'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.GOOD}
                      isActive={value?.value === EChipButtonType.GOOD}
                      size={'35px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.NOT_GOOD}
                      isActive={value?.value === EChipButtonType.NOT_GOOD}
                      size={'35px'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                        handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                      }
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.BAD}
                      isActive={value?.value === EChipButtonType.BAD}
                      size={'35px'}
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

export default P05;
