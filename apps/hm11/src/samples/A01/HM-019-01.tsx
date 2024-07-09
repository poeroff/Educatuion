import { useState } from 'react';

import { Box, Typography, Textarea } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM01901 = () => {
  const [isShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <HContainer headerInfo={null} vAlign='flex-start' submitLabel='완료하기' onSubmit={() => !isShow}>
      <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)'>
        <Box display='inline-flex'>
          <Box width='6px' height='28px' background='var(--color-h-math-primary-normal)' borderRadius='3px' margin='8px 8px 8px 0' />
          <Typography
            useGap={false}
            fontSize='var(--font-size-30)'
            lineHeight='45px'
            weight={'var(--font-weight-bold)'}
            color='var(--color-h-math-primary-normal)'
          >
            문제1 &nbsp;
          </Typography>
        </Box>
        등식 <MathExpression equation={`$ax^2+bx+c=a’x^2+b’x+c’$`} />이 <MathExpression equation={`$x$`} />에 대한 항등식이면&nbsp;
        <MathExpression equation={`$a=a’ , b=b’, c=c’$`} />이 성립함을 증명하시오.
      </Typography>

      <Box marginTop='24px' marginLeft='12px' useFull>
        <Textarea
          width='964px'
          onChange={e => {
            setValue(e.target.value);
          }}
          value={value}
          placeholder=''
          ariaLabel='a=a’, b=b’, c=c’이 성립함에 대한 증명을 적어주세요.'
        />
      </Box>
    </HContainer>
  );
};

export default HM01901;
