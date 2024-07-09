import { Box, ETextViewColor, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.SKYBLUE} title={'이번 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column' hAlign='center'>
            <Typography weight={'var(--font-weight-semiBold)'}>함께하는 수학</Typography>
            <Typography>기차에 승객 태우기</Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P01;
