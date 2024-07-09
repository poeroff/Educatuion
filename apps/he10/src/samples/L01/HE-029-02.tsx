import { Input, BoxWrap, Box, TMainHeaderInfoTypes, Scroll, Typography, List, Question, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02902 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo = {
    text: `2. Choose the grammatically correct words for (A) ~ (C)`,
  };

  const data = [{ num: '(A)' }, { num: '(B)' }, { num: '(C)' }];

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
        <Box height='412px' width='468px' background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>
            <Typography>
              Now let’s turn our attention to ourselves, Homo sapiens. How have we managed to survive for so long? Neanderthals existed together with
              Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens. sapiens until
            </Typography>
          </Scroll>
        </Box>
        <Box vAlign='center'>
          <List data={data}>
            {({ value }) => (
              <Box vAlign='center'>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
                <Input width='459px' />
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE02902;
