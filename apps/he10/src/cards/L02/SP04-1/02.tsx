import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Box marginBottom={24}>
          <Typography>
            I was shocked to see
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              how
            </Typography>
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              thin
            </Typography>
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              Nani Tama was.
            </Typography>
          </Typography>
          <Box color='var(--color-blue-900)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나는 할아버지가 얼마나 야위었는지를 보고 충격을 받았다. </Typography>
          </Box>
        </Box>
        <Box>
          <Typography>
            People were amazed at
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              how
            </Typography>
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              skillfully
            </Typography>
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              the young girl could do
            </Typography>
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} useGap={false}>
              taekwondo.
            </Typography>
          </Typography>
        </Box>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>사람들은 어린 소녀가 얼마나 태권도를 잘하는지 보고 놀랐다.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
