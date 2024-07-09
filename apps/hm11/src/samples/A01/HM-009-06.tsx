import { useState } from 'react';

import { Box, BoxWrap, Image, Input, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM00906 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <HContainer headerInfo={null} vAlign='flex-start' submitLabel='채점하기' onSubmit={() => !isShow}>
      <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)' lineHeight='48px'>
        <Box display='inline-flex'>
          <Box width='6px' height='28px' background='var(--color-h-math-primary-normal)' borderRadius='3px' margin='8px 8px 8px 0' />
          <Typography
            useGap={false}
            fontSize='var(--font-size-30)'
            lineHeight='48px'
            weight={'var(--font-weight-bold)'}
            color='var(--color-h-math-primary-normal)'
          >
            문제2 &nbsp;
          </Typography>
        </Box>
        A도시에서 C도시를 경유하여 B도시로 가는 거리는 16km인데, 터널을 통과하면 A도시에서 B도시로 가는 거리는 8km이다. A도시와 C도시를 잇는 도로의
        길이를 <MathExpression equation='$x$' />
        km, C도시와 B도시를 잇는 도로의 길이를 <MathExpression equation='$y$' />
        km라 할 때, <MathExpression equation='$x$' />와 <MathExpression equation='$y$' />의 값을 구하시오.
      </Typography>

      <BoxWrap marginTop='24px'>
        <Box vAlign='flex-end' marginLeft='12px'>
          <Image
            width='464px'
            height='234px'
            src={'/example/HM-009-06/M1-2-3-02-01R 1.png'}
            alt='A 도시, B 도시, C 도시를 잇는 도로가 있습니다. A 도시에서 C 도시를 경유하여 B 도시로 가거나, 터널을 통과하여 A 도시에서 B 도시로 갈 수 있습니다.'
          />
        </Box>
        <Box vAlign='flex-end'>
          <Box vAlign='center'>
            <Label
              size='x-small'
              value='답'
              shape='square'
              type='paint'
              background='var(--color-h-math-primary-normal)'
              color='var(--color-white)'
              marginRight={24}
            />
            <BoxWrap alignItems='center'>
              <Box>
                <Typography>
                  <MathExpression equation='$x = $' />
                </Typography>
                <Input value={value1} onChange={e => setValue1(e.target.value)} width='116px' ariaLabel='답 입력란' />
                &nbsp;,
              </Box>
              <Box>
                <Typography>
                  <MathExpression equation='$y = $' />
                </Typography>
                <Input value={value2} onChange={e => setValue2(e.target.value)} width='116px' ariaLabel='답 입력란' />
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM00906;
