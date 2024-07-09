import { Box, ETextViewColor, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='150px' type={ETextViewColor.SKYBLUE} title={'다음 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column' width={'320px'} hAlign='center'>
            <Typography weight={'var(--font-weight-semiBold)'}>해결하는 수학</Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P01;
