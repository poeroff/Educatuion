import { Box, EStyleFontSizes, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = ({ _page = 'P02' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box marginBottom={24}>
        <Typography>
          Advances in neural implants will make<Typography weight={'var(--font-weight-extraBold)'}>it</Typography>possible
          <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
            to install
          </Typography>
          software in our brains.
        </Typography>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>신경 임플란트의 발전으로 우리의 뇌에 소프트웨어를 설치하는 것이 가능해질 것이다.</Typography>
        </Box>
      </Box>
      <Box vAlign='center'>
        <Typography>
          Our team members consider<Typography weight={'var(--font-weight-extraBold)'}>it</Typography>important
          <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
            to arrive
          </Typography>
          on time for meetings.
        </Typography>
      </Box>
      <Box color='var(--color-blue-900)'>
        <Typography size={EStyleFontSizes['X-MEDIUM']}>우리 팀원들은 회의에 제시간에 도착하는 것을 중요하게 생각한다.</Typography>
      </Box>
    </Container>
  );
};

export default P02;
