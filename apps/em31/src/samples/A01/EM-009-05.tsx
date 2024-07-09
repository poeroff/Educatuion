import { Box, EStyleButtonTypes, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography, Drawing } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM00905 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '문제를 풀고 다른 문제를 만들어 해결해 보세요.',
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      submitBtnColor={EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='flex-start '
    >
      <Box display='flex' alignItems='baseline'>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' cssStyle={{ verticalAlign: '10px' }} />
        <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-medium)' lineHeight='58px'>
          지우개 85개를 한 명에게 3개씩 나누어 주려고 합니다. 몇 명에게 나누어 줄 수 있고 몇 개가 남나요?
        </Typography>
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
        <Drawing height='162px' />
      </Box>
      <Box vAlign='center' hAlign='flex-start' marginTop='24px'>
        <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
        <Input
          marginLeft={8}
          width='130px'
          name={`value1`}
          value={value}
          onChange={e => setValue(e.target.value)}
          ariaLabel='85÷3으로 만든 문제의 답'
        />
        <Box padding='4px 12px 4px 0'>
          <Typography useGap={false}>명에게 나누어 줄 수 있고</Typography>
        </Box>
        <Input width='50px' name={`value2`} value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='85÷3으로 만든 문제의 답' />
        <Box padding='4px 12px 4px 0'>
          <Typography useGap={false}>개가 남습니다.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default EM00905;
