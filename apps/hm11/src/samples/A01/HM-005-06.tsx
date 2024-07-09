import { Box, BoxWrap, Input, List, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01205 = () => {
  const data = ['2+√5, 2-√5', '3+√2i, 3-√2i'];
  const [values, setValues] = useState<string[]>(Array(data.length).fill(''));

  return (
    <HContainer vAlign='flex-start' headerInfo={null} useExtend submitLabel='풀이' onSubmit={() => {}}>
      <Typography fontSize='var(--font-size-32)' lineHeight='48px' weight='var(--font-weight-semiBold)'>
        <Box
          display='inline-block'
          width='6px'
          height='28px'
          marginBottom='-3px'
          marginRight='8px'
          background='var(--color-h-math-primary-origin)'
          borderRadius='3px'
        />
        <Typography useGap={false} fontSize='var(--font-size-30)' weight='var(--font-weight-bold)' color='var(--color-h-math-primary-normal)'>
          문제3
        </Typography>{' '}
        다음 두 수를 근으로 하고{' '}
        <Typography fontSize='inherit' weight='var(--font-weight-bold)' fontStyle='italic' useGap={false}>
          <MathExpression equation={`$x^2$`} />
        </Typography>
        의 계수가{' '}
        <Typography fontSize='inherit' weight='var(--font-weight-bold)' fontStyle='italic' useGap={false}>
          1
        </Typography>{' '}
        인 이차방정식을 구하시오.
      </Typography>

      <Box marginTop='24px'>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap key={index} boxGap={96} height='50px' marginBottom='12px'>
              <Box width='280px'>
                <Typography>
                  ({index}) <MathExpression equation={`$${value}$`} />
                </Typography>
              </Box>
              <Box>
                <Typography lineHeight='42px'>
                  <MathExpression equation={`$x^2+$`} />
                </Typography>
                <Input
                  inputSize='x-small'
                  width='48px'
                  value={values[index - 1]}
                  onChange={e => {
                    setValues(prev => prev.map((value, idx) => (idx === index - 1 ? e.target.value : value)));
                  }}
                />
                <Typography lineHeight='42px'>
                  <MathExpression equation={`$x+$`} />
                </Typography>
                <Input
                  inputSize='x-small'
                  width='48px'
                  value={values[index - 1]}
                  onChange={e => {
                    setValues(prev => prev.map((value, idx) => (idx === index - 1 ? e.target.value : value)));
                  }}
                />
                <Typography lineHeight='42px'>
                  <MathExpression equation={`$=0$`} />
                </Typography>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
    </HContainer>
  );
};
export default HM01205;
