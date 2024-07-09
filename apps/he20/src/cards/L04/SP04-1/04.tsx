import { Box, EStyleFontSizes, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P04 = ({ _page = 'P04' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box marginBottom={24}>
        <Typography>
          There’s
          <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
            a risk
          </Typography>
          <Typography weight={'var(--font-weight-extraBold)'}>that</Typography>organizations could access personal data without permission.
        </Typography>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>조직이 허가 없이 개인정보에 접근할 수 있는 위험이 있다.</Typography>
        </Box>
      </Box>
      <Box vAlign='center'>
        <Typography>
          <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
            The fact
          </Typography>
          <Typography weight={'var(--font-weight-extraBold)'}>that</Typography>Dokdo belongs to Korea should be known to the world. on time for
          meetings.
        </Typography>
      </Box>
      <Box color='var(--color-blue-900)'>
        <Typography size={EStyleFontSizes['X-MEDIUM']}>독도가 한국에 속한다는 사실은 전 세계에 알려져야 한다.</Typography>
      </Box>
    </Container>
  );
};

export default P04;
