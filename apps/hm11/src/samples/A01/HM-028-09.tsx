import { Box, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM02809 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography fontSize='var(--font-size-32)' fontWeight='var(--font-weight-semiBold)' lineHeight='48px'>
        삼차방정식 <MathExpression equation={`$x^3-1=0$`} />의 한 허근 <MathExpression equation={`$w$`} />의 성질
      </Typography>
      <Box marginTop='24px'>
        <Typography lineHeight='42px'>
          (2) 이차방정식 <MathExpression equation={`$x^2+x+1=0$`} />의 계수가 실수이고 한 허근이 <MathExpression equation={`$w$`} />
          이므로 다른 한 근은{' '}
          <Typography useSticker useGap={false}>
            <MathExpression equation={`$w$`} />의 켤레복소수인 <MathExpression equation={`$\\overline{w}$`} />
          </Typography>
          이다.
          <br />
          즉, <MathExpression equation={`$w$`} />와{' '}
          <Typography useGap={false} useSticker>
            <MathExpression equation={`$\\overline{w}$`} />
          </Typography>
          가 이차방정식 <MathExpression equation={`$x^2+x+1=0$`} />의 두 근이므로 근과 계수의 관계로부터
        </Typography>
      </Box>
      <Box hAlign='center'>
        <Box useRound background='var(--color-yellow-100)' padding='12px' width='auto'>
          <Typography useSticker>
            <MathExpression equation={`$w+\\overline{w}=-1$`} />,<MathExpression equation={`$w\\overline{w}=1$`} />
          </Typography>
        </Box>
      </Box>
      <Box marginTop='24px'>
        <Typography>이상을 정리하면 다음과 같다.</Typography>
      </Box>
      <Box marginTop='24px' useRound background='var(--color-purple-50)' padding='12px'>
        <Box>
          <Typography useSticker width='100%'>
            삼차방정식 <MathExpression equation={`$x^3-1=0$`} />의 한 허근을 <MathExpression equation={`$w$`} />, <MathExpression equation={`$w$`} />
            의 켤레복소수를 <MathExpression equation={`$\\overline{w}$`} />라 하면 <br />
            <Label marginRight={12} value='1' size='x-small' svgWidth={24} svgHeight={24} lineColor='var(--color-grey-900)' />
            <MathExpression equation={`$w^3=1$`} />, <MathExpression equation={`$w^2+w+1=0$`} />
            <br />
            <Label marginRight={12} value='2' size='x-small' svgWidth={24} svgHeight={24} lineColor='var(--color-grey-900)' />
            <MathExpression equation={`$w+\\overline{w}=-1$`} />, <MathExpression equation={`$w\\overline{w}=1$`} />
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM02809;
