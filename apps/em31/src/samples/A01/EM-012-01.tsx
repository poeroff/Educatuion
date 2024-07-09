import { Box, ETagLine, ETextViewColor, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM01201 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={'이번 시간에 배울 내용'}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column'>
            <Typography weight={'var(--font-weight-semiBold)'}>1. 세자리 수의 덧셈을 해요(2)</Typography>
            <Typography>- 받아올림이 한 번 있는 경우</Typography>
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

export default EM01201;
