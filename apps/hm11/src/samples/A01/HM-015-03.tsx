import { Box, Label, Typography, TMainHeaderInfoTypes, Scroll, Drawing, Button, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01503 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <Box>
        <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
          다항식의 곱셈에서 규칙을 발견해 보자.
        </Typography>
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography weight='var(--font-weight-bold)' color='var(--color-grey-700)'>
          활동
        </Typography>
        <Label type='math_icon' value={2} background='var(--color-h-math-difficulty)' />
        <Box marginLeft='12px' vAlign='center'>
          <Typography weight='var(--font-weight-bold)' color='var(--color-grey-700)'>
            활동
          </Typography>
          <Label type='math_icon' value={1} background='var(--color-h-math-difficulty)' />
        </Box>
        <Box padding='4px 12px 4px 0'>
          <Typography weight='var(--font-weight-regular)' useGap={false}>
            에서 발견할 수 있는 규칙을 적어 보자.
          </Typography>
        </Box>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Drawing height='220px' width='952px' />
      </Box>
      <Box marginTop='24px' marginLeft='12px'>
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
            <Box display='flex' padding='4px 12px' flexDirection='column'>
              <Box>
                <MathExpression equation={`\\(n\\)`} />
                <Typography useGap={false}>이 2 이상의 자연수 일 때,</Typography>
              </Box>
              <Box marginLeft='50px'>
                <MathExpression equation={`\\((x-1)(x^{n-1}+x^{n-2}+...+x+1)=x^n-1\\)`} />
              </Box>
              <Box>
                <Typography useGap={false}>이 성립한다.</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </HContainer>
  );
};

export default HM01503;
