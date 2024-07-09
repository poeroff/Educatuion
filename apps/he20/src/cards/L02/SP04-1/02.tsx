import { Box, EStyleFontSizes, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box marginBottom={24}>
        <Typography useGap={false}>If you have, then you</Typography>
        <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          may have fallen
        </Typography>

        <Typography useGap={false}>prey to a dark pattern.</Typography>

        <Box color='var(--color-blue-900)'>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            만약 그렇다면, 당신은 다크 패턴의 희생물이 되었을 수도 있다.
          </Typography>
        </Box>
      </Box>

      <Box marginBottom={24}>
        <Typography useGap={false}>I am late again. I</Typography>
        <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          should have gotten
        </Typography>

        <Typography useGap={false}>up early.</Typography>

        <Box color='var(--color-blue-900)'>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            나는 또 늦었다. 나는 일찍 일어났어야 했다.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
