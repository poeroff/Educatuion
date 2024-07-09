import { Box, EStyleFontSizes, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Box marginBottom={24}>
          <Typography>
            Some dehydrated birds
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              had fallen
            </Typography>
            out of the sky and
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration='underline'>
              were brought
            </Typography>{' '}
            to the center.
          </Typography>
          <Box color='var(--color-blue-900)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>일부 탈수 증세를 보이는 새들이 도시의 하늘에서 떨어져 센터로 옮겨져 왔다.</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>
            My dad
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              had already prepared
            </Typography>
            lunch when I
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration='underline'>
              arrived
            </Typography>{' '}
            home.
          </Typography>
        </Box>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>내가 집에 도착했을 때 아버지는 이미 점심을 준비해 놓으셨다.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
