import { Box, Typography, Label, BoxWrap, Input } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01102 = () => {
  const [value, setValue] = useState<string>('');
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerSubTexts: ['inference', 'communicate'],
    headerPattern: 'icon',
    iconType: 'thinkExtend',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <Typography fontSize='var(--font-size-32)' lineHeight='50px' fontWeight='var(--font-weight-semiBold)'>
        ‘연속하는 세 자연수의 곱에 가운데 수를 더하면 가운데 수의 세제곱과
        <br /> 같다.’는 것을 등식으로 나타내어 확인하려고 한다.
      </Typography>
      <Box>
        <Box vAlign='center' marginTop='12px'>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-28)' color='var(--color-grey-700)'>
            활동
          </Typography>
          <Label type='math_icon' value={1} background='var(--color-h-math-difficulty)' />
          <Box marginLeft='24px'>
            <Typography weight='var(--font-weight-regular)' fontSize='var(--font-size-28)'>
              연속하는 세 자연수의 가운데 수를 <MathExpression equation={`\\(x\\)`} />로 놓고 위의 문장을 식으로 나타내 보자.
            </Typography>
          </Box>
        </Box>
        <Box hAlign='center'>
          <Box marginTop='24px' width='264px' useRound border='1px solid #70522E4D' background='#FABF141A' padding='12px 24px' hAlign='center'>
            <Typography>
              <MathExpression equation={`\\(3×4×5+4=4^3\\)`} />
            </Typography>
          </Box>
        </Box>
        <BoxWrap justifyContent='flex-end' marginTop='24px'>
          <Box vAlign='center'>
            <Label
              size='x-small'
              value='답'
              shape='square'
              color='var(--color-white)'
              background='var(--color-h-math-primary-normal)'
              lineColor='none'
            />
          </Box>
          <Box vAlign='center'>
            <Input width='257px' ariaLabel='답 입력란' value={value} onChange={e => setValue(e.target.value)} />
          </Box>
        </BoxWrap>
      </Box>
    </HContainer>
  );
};

export default HM01102;
