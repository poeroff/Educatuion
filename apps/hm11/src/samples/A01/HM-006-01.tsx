import { Box, BoxWrap, EStyleFontSizes, ESvgType, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';
import icAimStudy from '@maidt-cntn/assets/icons/icAimStudy.svg';

const HM00601 = () => {
  const headerInfo = null;

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Box position='absolute' top='66px' left='230px' marginLeft='30px'>
        <Typography useGap={false} fontSize='var(--font-size-52)' weight='var(--font-weight-bold)' lineHeight='42px'>
          다항식의 덧셈과 뺄셈
        </Typography>
        <BoxWrap marginTop='38px' alignItems='center'>
          <Box marginRight='12px'>
            <SvgIcon alt='학습목료' src={icAimStudy} type={ESvgType.IMG} />
          </Box>
          <Typography fontSize='var(--font-size-18)' weight='var(--font-weight-semiBold)' color='#6A6D73' useGap={false}>
            다항식의 덧셈과 뺄셈의 원리를 설명하고, 그 계산을 할 수 있다.
          </Typography>
        </BoxWrap>
        <Box width='719px' height='140px' marginTop='24px' backgroundColor='var(--color-h-math-blue-gb)' useRound padding='12px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']} weight='var(--font-weight-regular)'>
            물체의 운동 에너지는 질량과 속력, 위치 에너지는 질량과 높이에 대한 다항식으로 나타내어 계산할 수 있다. 이와 같이 다항식은 생활 주변의 여러
            상황을 문자를 사용하여 간단하게 나타내는 데 이용된다.
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00601;
