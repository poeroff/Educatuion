import { Box, Button, EStyleButtonTypes, EStyleFontSizes, EStyleSizes, Input, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM00505 = () => {
  const [show, setShow] = useState<boolean>(false);
  const data = ['a=', 'b='];
  const [values1, setValues1] = useState<string[]>(Array(data.length).fill(''));
  const [values2, setValues2] = useState<string[]>(Array(3).fill(''));

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
        계수가 실수인 사차방정식{' '}
        <Typography fontSize='inherit' fontStyle='italic' weight='var(--font-weight-bold)' useGap={false}>
          <MathExpression equation={`$x^4-ax^3+bx^2-4x+3=0$`} />
        </Typography>
        의 한 근이{' '}
        <Typography fontSize='inherit' fontStyle='italic' weight='var(--font-weight-bold)' useGap={false}>
          <MathExpression equation={`$i$`} />
        </Typography>
        일 때, 다음을 구하시오
      </Typography>

      <Box marginTop='24px'>
        <Typography>
          (1) <MathExpression equation={`$a$`} />와 <MathExpression equation={`$b$`} />의 값
        </Typography>
        <Box display='inline-block' marginLeft='23px'>
          {data.map((value, index) => (
            <Box display='inline-block' marginLeft='12px'>
              <Typography>
                <MathExpression equation={`$${value}$`} />
              </Typography>
              <Input
                width='181px'
                value={values1[index]}
                onChange={e => {
                  setValues1(prev => prev.map((value, idx) => (index === idx ? e.target.value : value)));
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box marginTop='24px'>
        <Typography>(2) 나머지 세 근</Typography>
        <Box display='inline-block' marginLeft='8px'>
          {Array(3)
            .fill(null)
            .map((__, index) => (
              <Box display='inline-block' marginLeft={index !== 0 ? '4px' : '0'}>
                <Typography>
                  <MathExpression equation={`$x=$`} />
                </Typography>
                <Input
                  width='174px'
                  value={values2[index]}
                  onChange={e => {
                    setValues2(prev => prev.map((value, idx) => (index === idx ? e.target.value : value)));
                  }}
                />
                {index !== 2 && ','}
              </Box>
            ))}
        </Box>
      </Box>

      <Box vAlign='center' marginTop='24px'>
        <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명'>
          <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
        </Button>
        <Box opacity={show ? '1' : '0'} padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>
            계수가 실수인 다항식 <MathExpression equation={`$f(x)$`} />에 대하여 방정식 <MathExpression equation={`$f(x)=0$`} />의 한 허근이{' '}
            <MathExpression equation={`$a+bi$`} />
            이면그 켤레복소수 <MathExpression equation={`$a=bi$`} />도 이 방정식의 근이다.
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00505;
