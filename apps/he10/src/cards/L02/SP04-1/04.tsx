import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
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
            I felt
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              as if
            </Typography>
            people from the past{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              were
            </Typography>{' '}
            looking over the shoulders of the old men.
          </Typography>
          <Box color='var(--color-blue-900)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나는 과거의 사람들이 노인들의 어깨너머로 쳐다보고 있는 것처럼 느꼈다.</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>
            Eric looks
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              as if
            </Typography>
            he{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              owned
            </Typography>{' '}
            the whole world these days.
          </Typography>
        </Box>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>Eric은 요즘 온 세상을 다 가진 것처럼 보인다.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
