import { BoxWrap, Box, Scroll, TMainHeaderInfoTypes, Typography, List, Label, Radio, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

const HE02901 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };
  const questionInfo = {
    text: '1. What is the most appropriate title for the passage?',
  };

  const data = [
    {
      text: 'Physical Strength: The Key to Survival',
    },
    {
      text: 'Neanderthals’Superior Hunting Ability',
    },
    {
      text: 'What enabled Our Ancestors to Survive: Competition',
    },
    {
      text: 'How Homo Sapiens Thrived While Neanderthals Died Out',
    },
  ];

  return (
    <Container
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      submitBtnColor={EStyleButtonTypes.TERTIARY}
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap>
        <Box height='398px' width='400px' background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>
            <Typography>
              Now let’s turn our attention to ourselves, Homo sapiens. How have we managed to survive for so long? Neanderthals existed together with
              Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens. sapiens until
            </Typography>
          </Scroll>
        </Box>
        <Box useFull height='398px' flex='1'>
          <Scroll>
            <List gap={10} data={data}>
              {({ value, index = 1 }) => (
                <Radio type={'square'} align='vertical' name={'radio-question-A'} label={value?.text} value={index - 1 === 0}>
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE02901;
