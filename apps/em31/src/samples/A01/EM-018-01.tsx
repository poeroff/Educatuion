import { useState } from 'react';

import { Box, IQuestionProps, Input, Label, Question, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM01801 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize={28}>
        <Box marginRight={20}>[5~6]</Box>
        문구점에서 스케치북 1권은 813원, 자 1개는 489원에 할인하여 팝니다. 우진이는 용돈 1200원으로 스케치북 1권과 자 1개를 사려고 합니다. 물음에
        답하세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Question type='number' number='6'>
        스케치북 1권과 자 1개를 사려면 얼마가 필요한가요?
      </Question>
      <Box hAlign='center'>
        <Box vAlign='baseline' flexDirection='column' marginTop='24px'>
          <Box hAlign='center'>
            <Label
              value={'식'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Input width='344px' textAlign='center' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='식을 적어주세요.' />
          </Box>
          <Box hAlign='center' marginTop='8px'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Input width='217px' textAlign='center' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='답을 적어주세요.' />
            <Typography>원</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM01801;
