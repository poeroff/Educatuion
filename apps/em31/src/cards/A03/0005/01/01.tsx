import { Box, ETextViewColor, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'이번 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column' useRound>
            <Typography weight={'var(--font-weight-semiBold)'}>4. 나눗셈의 몫을 구해요</Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P01;
