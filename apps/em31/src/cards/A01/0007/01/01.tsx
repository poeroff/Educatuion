import { Box, ETagLine, ETextViewColor, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'이번 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column'>
            <Typography weight={'var(--font-weight-semiBold)'}>6. 세 자리 수의 뺄셈을 해요(3)</Typography>
            <Typography>- 받아내림이 두 번 있는 경우</Typography>
          </Box>
        </TextView>
      </Box>
      <Box hAlign='end' marginTop='24px'>
        <Tag type={ETagLine.GREEN} label='준비물' />
        <Typography>수 모형</Typography>
      </Box>
    </Container>
  );
};

export default P01;
