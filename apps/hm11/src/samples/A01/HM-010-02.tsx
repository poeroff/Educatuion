import { useState } from 'react';

import { Box, Button, EStyleButtonTypes, EStyleSizes, Scroll, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM01002 = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show1, setShow1] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null} useExtend>
      <Scroll tabIndex={0}>
        <Box vAlign='baseline'>
          <Box vAlign='center' whiteSpace='nowrap'>
            <Box width='6px' height='28px' background='var(--color-h-math-purple-origin)' borderRadius='3px' />
            <Typography fontSize='var(--font-size-30)' lineHeight='45px' weight='var(--font-weight-bold)' color='var(--color-h-math-purple-normal)'>
              예제2
            </Typography>
          </Box>
          <Typography weight={'var(--font-weight-semiBold)'} fontSize='var(--font-size-32)' lineHeight='50px'>
            등식 <MathExpression equation={`\\(a(x-1)^2+b(x-1)+c=x^2+5x\\)`} />가 <MathExpression equation={`\\(x\\)`} />에 대한 항등식이 되도록
            상수&nbsp;
            <MathExpression equation={`\\(a\\)`} />, <MathExpression equation={`\\(b\\)`} />, <MathExpression equation={`\\(c\\)`} />의 값을 정하시오.
          </Typography>
        </Box>
        <Box minHeight='45px' position='relative' marginTop={48}>
          <Box position='absolute' borderLeft='2px solid var(--color-h-math-purple-origin)'>
            <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
              <Typography
                useGap={false}
                weight='var(--font-weight-bold)'
                fontSize='var(--font-size-30)'
                color='var(--color-h-math-purple-normal)'
                lineHeight='32px'
              >
                풀이 1
              </Typography>
            </Button>
          </Box>
          {show && (
            <Box
              padding='0 0 24px 108px'
              borderBottomLeftRadius='var(--border-radius)'
              borderLeft='2px solid var(--color-h-math-purple-origin)'
              borderBottom='2px solid var(--color-h-math-purple-origin)'
            >
              <Box marginLeft='12px'>
                <Typography>주어진 등식의 좌변을 전개하여 정리하면</Typography>
                <Box padding='0 24px'>
                  <Typography>
                    <MathExpression equation={`\\(ax^2+(-2a+b)x+a-b+c=x2+5x\\)`} />
                  </Typography>
                </Box>
                <Typography>양변에서 동류항의 계수를 비교하면</Typography>
                <Box padding='0 24px'>
                  <Typography>
                    <MathExpression equation={`\\(a=1, -2a+b=5, a-b+c=0\\)`} />
                  </Typography>
                </Box>
                <Typography>
                  따라서&nbsp;
                  <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-h-math-purple-strong)'>
                    <MathExpression equation={`\\(a=1, b=7, c=6\\)`} />
                  </Typography>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box minHeight='45px' marginTop='48px' marginBottom={10} position='relative'>
          <Box position='absolute' top='0' left='0' borderLeft='2px solid var(--color-h-math-purple-origin)'>
            <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow1(!show1)}>
              <Typography
                useGap={false}
                weight='var(--font-weight-bold)'
                fontSize='var(--font-size-30)'
                color='var(--color-h-math-purple-normal)'
                lineHeight='32px'
              >
                풀이 2
              </Typography>
            </Button>
          </Box>
          {show1 && (
            <Box
              padding='0 0 24px 108px'
              borderBottomLeftRadius='var(--border-radius)'
              borderLeft='2px solid var(--color-h-math-purple-origin)'
              borderBottom='2px solid var(--color-h-math-purple-origin)'
            >
              <Box marginLeft='12px'>
                <Typography>
                  양변에 <MathExpression equation={`\\( x=0, x=1, x=2\\)`} />를 각각 대입해도 주어진 등식이 성립해야 하므로
                </Typography>
                <Box padding='0 24px'>
                  <Typography>
                    <MathExpression equation={`\\(a-b+c=0, c=6, a+b+c=14\\)`} />
                  </Typography>
                </Box>
                <Typography>
                  <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-h-math-purple-strong)'>
                    <MathExpression equation={`\\(c=6\\)`} />
                  </Typography>
                  을 나머지 두 식에 대입한 후 연립하여 풀면&nbsp;
                  <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-h-math-purple-strong)'>
                    <MathExpression equation={`\\(a=1, b=7\\)`} />
                  </Typography>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM01002;
