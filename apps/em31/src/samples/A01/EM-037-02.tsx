import { useState } from 'react';
import { Image, Box, Label, Typography, Input, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM03702 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='5' type='icon' />
        색연필 18자루를 필통 한 개에 6자루씩 담으려고 합니다. 필요한 필통은 몇 개인가요?
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'>
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='32px 20px' type='line' useRound>
          <Image src='../../assets/example/EM-037/MC31307.png' alt='색연필 18자루가 있습니다.' width='638px' height='65px' />
        </Box>
        <Box marginTop='24px'>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input  width='296px' marginLeft={8} value={value1} onChange={e => setValue1(e.target.value)} />
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input  width='148px' marginLeft={8} value={value2} onChange={e => setValue2(e.target.value)} />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM03702;
