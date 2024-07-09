import { Box, Typography, SvgIcon, BoxWrap, ESvgType } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icons/do_together.svg';
import empty_square from '@/assets/icons/empty_rectangle.svg';

const HM01702 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography fontSize='var(--font-size-32)' fontWeight='var(--font-weight-semiBold)' lineHeight='50px'>
        <Box display='inline-flex' marginRight='8px'>
          <SvgIcon src={headerIcon} type={ESvgType.IMG} />
        </Box>
        다음 <SvgIcon src={empty_square} type={ESvgType.IMG} alt='빈 칸' style={{ verticalAlign: '-6px' }} />
        안에 알맞은 것을 써넣어 보자.
      </Typography>

      <Box marginTop='24px'>
        <BoxWrap alignItems='center'>
          <Box flex={1}>
            <Typography lineHeight='42px'>
              다항식 <MathExpression equation={`$f(x)$`} />를 일차식 <MathExpression equation={`$ax+b$`} />로 나누었을 때의 몫을&nbsp;
              <MathExpression equation={`$Q(x)$`} />, 나머지를 <MathExpression equation={`$R$`} />
              이라 하면
            </Typography>
          </Box>
          <Box flex={1} borderTopLeftRadius='8px' borderTopRightRadius='8px' background='var(--color-h-math-blue-gb)' padding='24px'>
            <Typography fontSize='inherit' lineHeight='50px'>
              <MathExpression equation={`$f(x)=(ax+b)Q(x)+R$`} />
              <Box marginLeft='64px'>
                <MathExpression equation={`$=a(x+ $`} />
                <Typography useSticker useGap={false}>
                  <MathExpression equation={`$\\frac{b}{a}$`} />
                </Typography>
                <MathExpression equation={`$)Q(x)+R$`} />
              </Box>
            </Typography>
          </Box>
        </BoxWrap>
        <BoxWrap alignItems='center' borderTop='1px dashed' borderBottom='1px dashed' borderColor='var(--color-h-math-border-strong)'>
          <Box flex={1}>
            <Typography lineHeight='42px'>
              이 등식은 <MathExpression equation={`$x$`} />에 대한 항등식이므로 양변에 <MathExpression equation={`$x=- \\frac{b}{a}$`} />를 대입하면
            </Typography>
          </Box>
          <Box flex={1} background='var(--color-h-math-blue-gb)' padding='32px 24px'>
            <Typography fontSize='inherit' lineHeight='42px'>
              <MathExpression equation={`$f($`} />
              <Typography useSticker useGap={false}>
                <MathExpression equation={`$-\\frac{b}{a}$`} />
              </Typography>
              <MathExpression equation={`$)=a×0×Q($`} />
              <Typography useSticker useGap={false}>
                <MathExpression equation={`$-\\frac{b}{a}$`} />
              </Typography>
              <MathExpression equation={`$)+R$`} />
            </Typography>
          </Box>
        </BoxWrap>
        <BoxWrap alignItems='center'>
          <Box flex={1}>
            <Typography lineHeight='42px'>따라서 구하는 나머지는</Typography>
          </Box>
          <Box flex={1} background='var(--color-h-math-blue-gb)' padding='32px 24px' borderBottomRightRadius='8px' borderBottomLeftRadius='8px'>
            <Typography fontSize='inherit' lineHeight='42px'>
              <MathExpression equation={`$R=f($`} />
              <Typography useSticker useGap={false}>
                <MathExpression equation={`$-\\frac{b}{a}$`} />
              </Typography>
              <MathExpression equation={`$)$`} />
            </Typography>
          </Box>
        </BoxWrap>
      </Box>
    </HContainer>
  );
};

export default HM01702;
