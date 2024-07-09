import { Box, ETextViewColor, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P0101 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'이번 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column'>
            <Typography>문제로 마무리</Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P0101;
