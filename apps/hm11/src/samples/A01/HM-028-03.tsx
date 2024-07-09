import { Box, Typography, Image } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM02803 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
        곱셈 공식
      </Typography>

      <Box marginTop='24px' hAlign='center'>
        <Image
          width='472px'
          height='314px'
          src={'/example/HM-028-03/D1-1-1-02-03.png'}
          alt='17쪽에서 정리한 곱셈 공식을 기억하기 쉽도록 시각적으로 형상화한 그림이다.'
        />
      </Box>
    </HContainer>
  );
};

export default HM02803;
