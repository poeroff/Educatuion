import { Box, ETagLine, ETextViewColor, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'다음 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column'>
            <Typography weight={'var(--font-weight-semiBold)'}>2. km를 알아봐요</Typography>
          </Box>
        </TextView>
      </Box>
      <Box hAlign='end' marginTop='24px'>
        <Tag type={ETagLine.GREEN} label='준비물' />
        <Typography>태블릿 피시</Typography>
      </Box>
    </Container>
  );
};

export default P01;
