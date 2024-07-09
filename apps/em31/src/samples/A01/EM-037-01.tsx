import { ChangeEvent, useState } from 'react';
import { Image, Box, Label, Typography, Input, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM03701 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        농구공 30개를 바구니 5개에 똑같이 나누어 담으면 바구니 한 개에 담을 수 있는 농구공은 몇 개인지 나눗셈식을 써 보세요.
      </>
    ),
  };

  const [inputs, setInputs] = useState({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'>
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px 44px' type='line' useRound>
          <Image src='../../assets/example/EM-037/MC31305.jpg' alt='농구공 30개와 바구니 5개가 있습니다.' width='590px' height='215px' />
        </Box>
        <Box marginTop='24px'>
          <Input  value={inputs.value1} onChange={handleInputChangeEvent} width='130px' />
          <Typography>÷</Typography>
          <Input  value={inputs.value2} onChange={handleInputChangeEvent} width='130px' />
          <Typography>=</Typography>
          <Input  value={inputs.value3} onChange={handleInputChangeEvent} width='130px' />
        </Box>
      </Box>
    </Container>
  );
};

export default EM03701;
