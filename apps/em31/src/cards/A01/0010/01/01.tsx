import { Box, ETagLine, ETextViewColor, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo = null;

  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'이번 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column' vAlign='center'>
            <Typography weight={'var(--font-weight-bold)'}>해결하는 수학</Typography>
            <Typography>쓰담 달리기 하며 환경 보호하기</Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P01;
