import { Box, EStyleFontSizes, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
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
            Molly seems to be adapting well, and I
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              expect
            </Typography>
            her{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} useGap={false}>
              to get better
            </Typography>{' '}
            soon.
          </Typography>
          <Box color='var(--color-blue-900)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>Molly는 적응을 잘하는 것처럼 보여서, 나는 그녀가 곧 나아질 것이라 기대한다.</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>
            His friends
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
              encouraged
            </Typography>
            him{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} useGap={false}>
              to attend
            </Typography>{' '}
            the music festival.
          </Typography>
        </Box>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>그의 친구들은 그가 음악 축제에 참석하기를 권했다. </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
