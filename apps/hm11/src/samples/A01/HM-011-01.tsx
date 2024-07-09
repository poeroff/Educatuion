import { Box, EStyleFontSizes, Scroll, Typography, Image, Label } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { MathExpression } from '@maidt-cntn/ui/math';

const HM01101 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerSubTexts: ['inference', 'solution'],
    headerPattern: 'icon',
    iconType: 'thinkExtend',
  };
  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Scroll tabIndex={0}>
        <Typography fontSize='var(--font-size-32)' lineHeight='50px' fontWeight='var(--font-weight-semiBold)'>
          &nbsp;다음 그림과 같은 정사각뿔대의 부피를 고대 바빌로니아 사람들은 A와 같이 대략적으로 계산했지만, 비슷한 시기 이집트 사람들은 B와 같이
          정확히 계산했다고 한다.
        </Typography>
        <Box vAlign='center'>
          <Typography size={EStyleFontSizes['X-MEDIUM']} color={'var(--color-grey-700)'} weight={'var(--font-weight-bold)'}>
            활동
          </Typography>
          <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-difficulty)' />
          <Typography>A-B를 계산한 결과를 식으로 나타내 보자. </Typography>
        </Box>
        <Box position='relative'>
          <Box useRound hAlign='space-between' height='221px' margin='12px 0 8px' padding='16px 0 6px' border='1px solid var(--color-grey-300)'>
            <Box marginTop='45px' marginLeft='115px' fontSize='var(--font-size-20)'>
              <MathExpression equation={`\\(A=\\frac{1}{2}(a^2 + b^2)h\\)`} />
            </Box>
            <Box marginTop='30px' marginRight='95px' fontSize='var(--font-size-20)'>
              <MathExpression equation={`\\(B=\\frac{1}{3}(a^2 + ab + b^2)h\\)`} />
            </Box>
            <Box position='absolute' zIndex={-1}>
              <Image
                src='../../assets/example/HM-011-01/M1-1-1-01-03.png'
                alt='정사각뿔대가 한 개 있으며, 이 정사각뿔대는 밑면의 한 길이가 a이고 윗면의 한 길이가 b이고 높이가 h입니다.'
                width='896px'
              />
            </Box>
          </Box>
          <Box hAlign='flex-end'>
            <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color={'var(--color-grey-700)'}>
              (출처: KATz, V.J., 『A History of Mathematics, An Introduction』)
            </Typography>
          </Box>
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM01101;
