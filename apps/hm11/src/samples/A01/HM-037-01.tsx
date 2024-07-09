import styled from '@emotion/styled';
import { useState } from 'react';

import { Box, Label, Typography, ConnectLine, Button, EStyleButtonTypes, EStyleSizes, Scroll } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM03701 = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Scroll tabIndex={0}>
        <Box marginBottom='24px'>
          <Typography weight='var(--font-weight-semiBold)' lineHeight='50px' fontSize='var(--font-size-32)'>
            다항식의 곱셈에서 규칙을 발견해 보자.
          </Typography>
        </Box>
        <Box vAlign='center' marginBottom='24px'>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-28)' color='var(--color-grey-700)'>
            활동
          </Typography>
          <Label type='math_icon' value={1} background='var(--color-h-math-difficulty)' />
          <Typography weight='var(--font-weight-regular)' fontSize='var(--font-size-28)'>
            다음 식을 전개한 결과를 선으로 연결해 보자.
          </Typography>
        </Box>
        <Box hAlign='center' width={816} margin='0 auto'>
          <ConnectLineContainer direction='vertical'>
            <ConnectLineSide sideId='left'>
              <ConnectLineItem content={<MathExpression equation={`(\\(x-1)(x+1)\\)`} />} itemId='A' ariaLabel='(x-1)(x+1)' />
              <ConnectLineItem content={<MathExpression equation={`(\\(x-1)(x^2+x+1)\\)`} />} itemId='B' ariaLabel='(x-1)(x^2+x+1)' />
              <ConnectLineItem content={<MathExpression equation={`(\\(x-1)(x^3+x^2+x+1)\\)`} />} itemId='C' ariaLabel='(x-1)(x^3+x^2+x+1)' />
              <ConnectLineItem content={<MathExpression equation={`(\\(x-1)(x^4+x^3+x^2+x+1)\\)`} />} itemId='D' ariaLabel='(x-1)(x^4+x^3+x^2+x+1)' />
            </ConnectLineSide>
            <ConnectLineSide sideId='right'>
              <ConnectLineItem content={<MathExpression equation={`\\(x^5-1\\)`} />} itemId='1' ariaLabel='x^5-1' />
              <ConnectLineItem content={<MathExpression equation={`\\(x^4-1\\)`} />} itemId='2' ariaLabel='x^4-1' />
              <ConnectLineItem content={<MathExpression equation={`\\(x^3-1\\)`} />} itemId='3' ariaLabel='x^3-1' />
              <ConnectLineItem content={<MathExpression equation={`\\(x^2-1\\)`} />} itemId='4' ariaLabel='x^2-1' />
            </ConnectLineSide>
          </ConnectLineContainer>
        </Box>
        <Box marginTop='24px'>
          <Box borderLeft='2px solid var(--color-h-math-primary-origin)'>
            <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
              <Typography
                useGap={false}
                weight='var(--font-weight-bold)'
                fontSize='28px'
                color='var(--color-h-math-primary-strong)'
                lineHeight='42px'
              >
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
              <Box display='flex'>
                <Box>
                  <MathExpression equation={`\\((x-1)\\)`} />
                </Box>
                <Box>
                  <MathExpression equation={`\\((x+1)=x^2-1\\)`} />
                  <br />
                  <MathExpression equation={`\\((x-1)(x^2+x+1)=x^3-1\\)`} />
                  <br />
                  <MathExpression equation={`\\((x-1)(x^3+x^2+x+1)\\)`} />
                  <Box marginLeft='36px'>
                    <MathExpression equation={`\\(=x^4+x^3+x^2+x-x^3-x^2-x-1\\)`} />
                    <br />
                    <MathExpression equation={`\\(=x^4-1\\)`} />
                  </Box>
                  <MathExpression equation={`\\((x-1)(x^4+x^3+x^2+x+1)\\)`} />
                  <br />
                  <Box marginLeft='36px'>
                    <MathExpression equation={`\\(=x^5+x^4+x^3+x^2+x-x^4-x^3-x^2-x-1\\)`} />
                    <br />
                    <MathExpression equation={`\\(=x^5-1\\)`} />
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

const ConnectLineContainer = styled(ConnectLine)``;

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineItem = styled(ConnectLine.Item)`
  button {
    height: 50px;
    padding: 4px 12px;
    text-align: left;
  }
  > div {
    background-color: var(--color-grey-600);
  }
`;

export default HM03701;
