import { Box, Label, Typography, TMainHeaderInfoTypes, Scroll, Input, BoxWrap, Button, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01504 = () => {
  const [value, setValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <Scroll tabIndex={0}>
        <Box marginBottom='24px'>
          <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)'>
            다항식의 곱셈에서 규칙을 발견해 보자.
          </Typography>
        </Box>
        <Typography weight='var(--font-weight-regular)' fontSize='var(--font-size-28)'>
          <Box display='inline-flex'>
            <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-28)' color='var(--color-grey-700)' useGap={false}>
              활동
            </Typography>
            <Box vAlign='center'>
              <Label type='math_icon' value={3} background='var(--color-h-math-difficulty)' marginLeft={12} marginRight={24} />
            </Box>
          </Box>
          <Box display='inline-flex'>
            <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-28)' color='var(--color-grey-700)' useGap={false}>
              활동
            </Typography>
            <Box vAlign='center'>
              <Label type='math_icon' value={2} background='var(--color-h-math-difficulty)' marginLeft={12} />
            </Box>
          </Box>
          에서 찾은 규칙을 이용하여 <MathExpression equation={`\\((x-1)(x^{99}+x^{98}+...+x+1)\\)`} />을 전개해 보자.
        </Typography>
        <BoxWrap justifyContent='flex-end' alignItems='center' marginTop={12}>
          <Box>
            <Label size='x-small' value='답' shape='square' type='paint' background='var(--color-h-math-primary-normal)' color='var(--color-white)' />
          </Box>
          <Box>
            <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='210px' ariaLabel={`답 입력란`} />
          </Box>
        </BoxWrap>
        <Box marginTop='24px'>
          <Box borderLeft='2px solid var(--color-h-math-primary-origin)'>
            <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
              <Typography useGap={false} weight={700} fontSize='28px' color='var(--color-h-math-primary-strong)' lineHeight='42px'>
                풀이
              </Typography>
            </Button>
          </Box>
          {show && (
            <Box
              padding='4px 12px 28px'
              borderBottomLeftRadius='8px'
              borderLeft='2px solid var(--color-h-math-primary-origin)'
              borderBottom='2px solid var(--color-h-math-primary-origin)'
            >
              <Box>
                <MathExpression equation={`\\(n\\)`} />
                <Typography useGap={false}>이 2 이상의 자연수 일 때,</Typography>
                <MathExpression equation={`\\((x-1)(x^{n-1}+x^{n-2}+...+x+1)=x^n-1\\)`} />
                <Typography useGap={false}> 이 성립 하므로</Typography>
              </Box>
              <Box marginLeft='50px'>
                <MathExpression equation={`\\((x-1)(x^{99}+x^{98}+...+x+1)=x^{100}-1\\)`} />
              </Box>
            </Box>
          )}
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM01504;
