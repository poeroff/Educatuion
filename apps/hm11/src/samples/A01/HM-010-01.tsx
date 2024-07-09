import { useState } from 'react';
import styled from '@emotion/styled';

import { Box, Scroll, Typography, Button, EStyleButtonTypes, EStyleSizes } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

import polom from '../../assets/icons/polom.svg';

const HM01001 = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null} useExtend>
      <Scroll tabIndex={0}>
        <Box vAlign='center'>
          <Box width='6px' height='28px' background='var(--color-h-math-purple-origin)' borderRadius='3px' />
          <Typography fontSize='var(--font-size-30)' lineHeight='45px' weight='var(--font-weight-bold)' color='var(--color-h-math-purple-normal)'>
            예제1
          </Typography>
          <Typography weight={'var(--font-weight-semiBold)'} fontSize='var(--font-size-32)' lineHeight='50px'>
            다음 두 다항식 <MathExpression equation={`\\(A\\)`} />
            와 <MathExpression equation={`\\(B\\)`} />에 대해 <MathExpression equation={`\\(A+B\\)`} />
            와 <MathExpression equation={`\\(A-B\\)`} />를 계산하시오.
          </Typography>
        </Box>

        <Box hAlign='center' marginTop='12px'>
          <Box
            useRound
            vAlign='center'
            height='77px'
            fontSize='var(--font-size-24)'
            padding='24px'
            border='1px solid var(--color-grey-300)'
            width='fit-content'
          >
            <MathExpression equation={`\\(A=x^2 - 2xy = 3y^2\\)`} />
            <Typography>,</Typography>
            <MathExpression equation={`\\(B=-3x^2 + 2xy + 4y^2\\)`} />
          </Box>
        </Box>

        <Box marginTop='48px' position='relative'>
          <Box position='absolute' top='0' left='0' borderLeft='2px solid var(--color-h-math-purple-origin)'>
            <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
              <Typography
                useGap={false}
                weight='var(--font-weight-bold)'
                fontSize='var(--font-size-30)'
                color='var(--color-h-math-purple-normal)'
                lineHeight='32px'
              >
                풀이
              </Typography>
            </Button>
          </Box>
          {show && (
            <Box
              padding='6px 0 28px 89px'
              borderBottomLeftRadius='8px'
              borderLeft='2px solid var(--color-h-math-purple-origin)'
              borderBottom='2px solid var(--color-h-math-purple-origin)'
            >
              <Box vAlign='flex-start' hAlign='space-between'>
                <MathExpression equation={`\\(A+B\\)`} />
                &nbsp;
                <Box lineHeight='40px'>
                  <MathExpression equation={`\\(= (x^2 - 2xy + 3y^2) + (-3x^2 + 2xy + 4y^2)\\)`} />
                  <MathExpression equation={`\\(= (1 - 3)x^2 + (-2 + 2)xy + (3 + 4)y^2\\)`} />
                  <Box vAlign='center'>
                    <MathExpression equation={'\\(= \\)'} />
                    <Box color='var(--color-h-math-purple-strong)'>
                      <MathExpression equation={`\\( -2x^2 + 7y^2\\)`} />
                    </Box>
                  </Box>
                </Box>
                <Box useRound border='1px solid var(--color-grey-300)' padding='12px' width='207px' height='110px'>
                  <Box fontSize='var(--font-size-16)' width='183px' height='86px' hAlign='center' flexDirection='column'>
                    <StyledBox>
                      <MathExpression equation={`\\(x^2 - 2xy + 3y^2\\)`} />
                      <Sign>+</Sign>
                      <MathExpression equation={`\\(-3x^2 + 2xy + 4y^2\\)`} />
                    </StyledBox>

                    <Box width='126px' marginLeft={12} hAlign='space-between'>
                      <MathExpression equation={`\\(-2x^2 \\)`} />
                      <MathExpression equation={`\\(+7y^2 \\)`} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box vAlign='flex-start' hAlign='space-between' marginTop='48px'>
                <MathExpression equation={`\\(A-B\\)`} />
                &nbsp;
                <Box lineHeight='40px'>
                  <MathExpression equation={`\\(= (x^2 - 2xy + 3y^2) - (-3x^2 + 2xy + 4y^2)\\)`} />
                  <MathExpression equation={`\\(= (x^2 - 2xy + 3y^2) + (3x^2 - 2xy - 4y^2)\\)`} />
                  <MathExpression equation={`\\(= (1 + 3)x^2 + (-2 - 2)xy + (3 - 4)y^2\\)`} />
                  <Box vAlign='center'>
                    <MathExpression equation={'\\(= \\)'} />
                    <Box color='var(--color-h-math-purple-strong)'>
                      <MathExpression equation={`\\(4x^2 - 4xy - y^2\\)`} />
                    </Box>
                  </Box>
                </Box>
                <Box useRound border='1px solid var(--color-grey-300)' padding='12px' width='207px' height='110px'>
                  <Box fontSize='var(--font-size-16)' width='183px' height='86px' hAlign='center' flexDirection='column'>
                    <StyledBox>
                      <MathExpression equation={`\\(x^2 - 2xy + 3y^2\\)`} />
                      <Sign>-</Sign>
                      <MathExpression equation={`\\(-3x^2 - 2xy + 4y^2\\)`} />
                    </StyledBox>
                    <Box width='auto' marginLeft={24}>
                      <MathExpression equation={`\\(4x^2 - 4xy - y^2\\)`} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Scroll>
    </HContainer>
  );
};

const StyledBox = styled.div`
  width: 145px;
  border-bottom: 1px solid var(--color-black);
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 12px;
  position: relative;
  padding-bottom: 8px;

  &::before {
    content: '';
    background: url(${polom}) center center no-repeat;
    display: inline-block;
    width: 20px;
    height: 30px;
    position: absolute;
    bottom: -1px;
    left: -7px;
  }
`;

const Sign = styled.span`
  position: absolute;
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-regular);
  bottom: 4.5px;
  left: -20px;
`;

export default HM01001;
