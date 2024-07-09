import { Box, ETextViewColor, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'다음 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column'>
            <Typography>6. 분수와 소수</Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P01;
