import { Box, BoxWrap, IQuestionProps, Input, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM02103 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '곱셈식을 나눗셈식 2개로, 나눗셈식을 곱셈식 2개로 나타내 보세요.',
  };

  const [isShow, setShow] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <BoxWrap>
        <Box useFull type='dashed' useRound padding='20px'>
          <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
            <Typography>3×9=27</Typography>
          </Box>
          <Box display='flex'>
            <Input width='100%' />
            <Typography>÷</Typography>
            <Input width='100%' />
            <Typography>=</Typography>
            <Input width='100%' />
          </Box>
          <Box display='flex' marginTop='24px'>
            <Input width='100%'  />
            <Typography>÷</Typography>
            <Input width='100%' />
            <Typography>=</Typography>
            <Input width='100%'  />
          </Box>
        </Box>
        <Box useFull type='dashed' useRound padding='24px'>
          <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
            <Typography>35÷5=7</Typography>
          </Box>
          <Box display='flex'>
            <Input width='100%'  />
            <Typography>x</Typography>
            <Input width='100%' />
            <Typography>=</Typography>
            <Input width='100%'  />
          </Box>
          <Box display='flex' marginTop='24px'>
            <Input width='100%' />
            <Typography>x</Typography>
            <Input width='100%'  />
            <Typography>=</Typography>
            <Input width='100%'  />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM02103;
