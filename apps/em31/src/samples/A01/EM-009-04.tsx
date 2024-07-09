import { Box, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography, Image, Drawing } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM00904 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const [value, setValue] = useState<string>('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        딸기 15개를 3명이 똑같이 나누어 먹으려고 합니다. 한 명이 먹을 수 있는 딸기는 몇 개인가요?
      </>
    ),
  };

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
      vAlign='flex-start'
    >
      <Box width='920px' padding='20px' type='line' hAlign='center' useRound>
        <Image src='/example/EM-009-04/EC32317.png' width='704px' height='38px' alt='딸기가 15개 있습니다.' />
      </Box>
      <Box marginTop='24px' display='flex'>
        <Box marginTop='40px'>
          <Label
            value='식'
            color='var(--color-yellow-800)'
            background='var(--color-yellow-100)'
            lineColor='var(--color-yellow-700)'
            marginRight={10}
          />
        </Box>
        <Drawing width='920px' height='160px' />
      </Box>
      <Box vAlign='center' hAlign='flex-end' marginTop='24px'>
        <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
        <Input
          marginLeft={8}
          width='245px'
          name={`value1`}
          value={value}
          onChange={e => setValue(e.target.value)}
          ariaLabel='15÷3으로 만든 문제의 답'
        />
        <Typography weight='var(--font-weight-medium)'>개</Typography>
      </Box>
    </Container>
  );
};

export default EM00904;
