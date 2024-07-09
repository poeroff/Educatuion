import { useState } from 'react';
import { Box, Button, EStyleButtonTypes, EStyleFontSizes, EStyleSizes, Label, Typography } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM00801 = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null}>
      <Box useFull marginTop='34px'>
        <Box whiteSpace='pre-wrap'>
          <Typography lineHeight='42px'>
            &nbsp; 다항식은 그 항을 차수의 크기순으로 정리하면 계산할 때 편리하다.{'\n'}다항식을 한 문자에 대하여 차수가 높은 항부터 차례대로 나타내는
            것을 그 문자에 대하여&nbsp;
            <Typography useSticker useGap={false}>
              내림차순으로 정리한다
            </Typography>
            고 하고, 차수가 낮은 항부터 차례대로 나타내는 것을 그 문자에 대하여&nbsp;
            <Typography useSticker useGap={false}>
              오름차순으로 정리한다
            </Typography>
            고 한다.
          </Typography>
        </Box>
        <Box vAlign='center' marginTop='24px'>
          <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명'>
            <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
          </Button>
          <Box opacity={show ? '1' : '0'} padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>상수항의 차수는 0으로 생각한다. </Typography>
          </Box>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00801;
