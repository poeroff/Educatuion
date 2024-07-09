import { BoxWrap, Box, Typography } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM00101 = () => {
  return (
    <HContainer headerInfo={null}>
      <BoxWrap flexDirection='column' alignItems='flex-end' width='fit-content' paddingLeft='142px' boxGap={0}>
        <Box>
          <Typography color='var(--color-white)' fontSize='172px' weight={300} useGap={false} fontFamily={'noto-Regular'}>
            I
          </Typography>
        </Box>
        <Box>
          <Typography color='var(--color-white)' fontSize='80px' weight='var(--font-weight-bold)' useGap={false} lineHeight='120px'>
            다항식
          </Typography>
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM00101;
