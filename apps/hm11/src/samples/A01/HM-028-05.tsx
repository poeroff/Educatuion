import { Box, Typography, Scroll, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import icExample from '@maidt-cntn/assets/icons/icExample.svg';

const HM02805 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Scroll tabIndex={0}>
        <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
          이차방정식의 두 허근은 어떤 관계일까?
        </Typography>
        <Box marginTop='24px'>
          <Typography>
            계수가 실수인 이차방정식 <MathExpression equation={'$ax^2+bx+c$'} /> 은 근의 공식에 의하여 두 근
          </Typography>
          <Box marginLeft='80px'>
            <MathExpression equation={'$-\\frac{b}{2a}+\\frac{\\sqrt{b^2-4ac}}{2a},$'} />
            <MathExpression equation={'$-\\frac{b}{2a}+\\frac{\\sqrt{b^2-4ac}}{2a}$'} />
          </Box>
          <Typography>을 갖는다.</Typography>
        </Box>
        <Box>
          <Typography>
            이때 <MathExpression equation={'$b^2-4ac<0$'} /> 이면 <MathExpression equation={'$\\sqrt{b^2-4ac}$'} />는{' '}
            <Typography useGap={false} useSticker>
              허수
            </Typography>
            가 되고, 두 근은{' '}
            <Typography useGap={false} useSticker>
              서로 켤레복소수
            </Typography>
            이다.
          </Typography>
          <Typography>
            즉, 계수가 실수인 이차방정식이 서로 다른 두 허근을 가질 때, 두 허근은{' '}
            <Typography useGap={false} useSticker>
              서로 켤레복소수
            </Typography>
            이다.
          </Typography>
        </Box>

        <Box marginTop='24px'>
          <SvgIcon src={icExample} type={ESvgType.IMG} alt='보기' />
          <Typography>
            의 이차방정식 은 서로 다른 두 허근 <MathExpression equation={'$x^2-3x+5=0$'} />은 서로 다른 두 허근
          </Typography>
          <Box marginLeft='80px'>
            <MathExpression equation={'$-\\frac{3}{2}+\\frac{\\sqrt{11}}{2}i,$'} />
            <MathExpression equation={'$\\frac{3}{2}+\\frac{\\sqrt{11}}{2}i,$'} />
          </Box>
          <Typography>를 갖고, 이때 두 근은 서로 켤레복소수이다.</Typography>
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM02805;
