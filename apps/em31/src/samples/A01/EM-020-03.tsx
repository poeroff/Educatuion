import { Box, IQuestionProps, Input, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM02003 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} />
        야구공 110개를 8모둠에 똑같이 나누어 주려고 합니다. <br />한 모둠에 몇 개씩 줄 수 있고 몇 개가 남나요?
      </>
    ),
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [value5, setValue5] = useState<string>('');
  const [value6, setValue6] = useState<string>('');
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Box hAlign='center' flexDirection='column'>
        <Box width='712px'>
          <Label
            value='식'
            color='var(--color-yellow-800)'
            background='var(--color-yellow-100)'
            lineColor='var(--color-yellow-700)'
            marginRight={8}
          />
          <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='130px' ariaLabel={`답 입력란`} />
          <Typography>÷</Typography>
          <Input placeholder='' name={`value2`} value={value2} onChange={e => setValue2(e.target.value)} width='130px' ariaLabel={`답 입력란`} />
          <Typography>=</Typography>
          <Input placeholder='' name={`value3`} value={value3} onChange={e => setValue3(e.target.value)} width='130px' ariaLabel={`답 입력란`} />
          <Typography>···</Typography>
          <Input placeholder='' name={`value4`} value={value4} onChange={e => setValue4(e.target.value)} width='130px' ariaLabel={`답 입력란`} />
        </Box>
        <Box marginTop='24px' width='712px'>
          <Label
            value='답'
            color='var(--color-yellow-800)'
            background='var(--color-yellow-100)'
            lineColor='var(--color-yellow-700)'
            marginRight={8}
          />
          <Input placeholder='' name={`value5`} value={value5} onChange={e => setValue5(e.target.value)} width='148px' ariaLabel={`답 입력란`} />
          <Box display='inline' padding='4px 12px 6px 2px'>
            <Typography useGap={false}>개, 남는 야구공 수</Typography>
          </Box>
          <Input placeholder='' name={`value6`} value={value6} onChange={e => setValue6(e.target.value)} width='148px' ariaLabel={`답 입력란`} />
          <Box display='inline' padding='4px 12px 6px 2px'>
            <Typography useGap={false}>개</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM02003;
