import { useState } from 'react';
import { BoxWrap, Label, Box, Typography, EStyleFontSizes, SvgIcon, ESvgType, Button, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

import icExample from '@maidt-cntn/assets/icons/icExample.svg';

const HM00802 = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null}>
      <BoxWrap boxGap={12}>
        <Box marginTop='6px'>
          <SvgIcon src={icExample} type={ESvgType.IMG} alt='보기' />
        </Box>
        <Box>
          <BoxWrap>
            <Box margin='8px 0'>
              <Label value={1} size='x-small' svgWidth={24} svgHeight={24} />
            </Box>
            <Box>
              <Typography>
                다항식 <MathExpression equation={`\\(2x^2 + x^4 - 3x - 5 + x^3\\)`} />을 <MathExpression equation={`\\(x\\)`} />에 대하여
              </Typography>
              <Typography>
                내림차순으로 정리하면{' '}
                <Typography useSticker width='300px'>
                  <MathExpression equation={`\\(x^4 + x^3 + 2x^2 - 3x - 5\\)`} />
                </Typography>
              </Typography>
              <Typography>
                오름차순으로 정리하면{' '}
                <Typography useSticker width='325px'>
                  <MathExpression equation={`\\(-5 - 3x + 2x^2 + x^3 + x^4\\)`} />
                </Typography>
              </Typography>
            </Box>
          </BoxWrap>
          <BoxWrap marginTop='24px'>
            <Box margin='8px 0'>
              <Label value={2} size='x-small' svgWidth={24} svgHeight={24} />
            </Box>
            <Box>
              <Typography>
                다항식 <MathExpression equation={`\\(2xy - 3x^3 + x^2y^2 - y + 4\\)`} />를
              </Typography>
              <Typography>
                <MathExpression equation={`\\(x\\)`} />에 대하여 내림차순으로 정리하면{' '}
                <Typography useSticker width='350px'>
                  <MathExpression equation={`\\(-3x^3 + x^2y^2 + 2xy - y + 4\\)`} />
                </Typography>
              </Typography>
              <Typography>
                <MathExpression equation={`\\(y\\)`} />에 대하여 오름차순으로 정리하면{' '}
                <Typography useSticker width='325px'>
                  <MathExpression equation={`\\(x^2y^2 + 2xy - y - 3x^3 + 4\\)`} />
                </Typography>
              </Typography>
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
      <Box vAlign='center' marginTop='36px'>
        <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명'>
          <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
        </Button>
        <Box opacity={show ? '1' : '0'} width='auto' padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>다항식은 보통 내림차순으로 정리한다.</Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00802;
