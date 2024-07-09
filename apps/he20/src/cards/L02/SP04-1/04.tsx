import { Box, EStyleFontSizes, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box marginBottom={24}>
        <Typography useGap={false}>Critics</Typography>
        <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          suggest
        </Typography>

        <Typography useGap={false}>that a marketing strategy&nbsp;</Typography>
        <Typography type='box'>(should) create</Typography>
        <Typography useGap={false}>value for both companies and customers.</Typography>

        <Box color='var(--color-blue-900)'>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            비평가들은 마케팅 전략이 기업과 고객 양측에 가치를 창출해야 한다고 제안한다.
          </Typography>
        </Box>
      </Box>

      <Box marginBottom={24}>
        <Typography useGap={false}>Mary</Typography>
        <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          insisted
        </Typography>

        <Typography useGap={false}>that we&nbsp;</Typography>
        <Typography type='box'>(should) complete</Typography>
        <Typography useGap={false}>&nbsp;the task quickly,</Typography>
        <Typography useGap={false}>but we couldn't.</Typography>

        <Box color='var(--color-blue-900)'>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            Mary는 우리가 작업을 빨리 마무리해야 한다고 주장했지만, 우리는 할 수 없었다.
          </Typography>
        </Box>
      </Box>

      <Box marginBottom={24}>
        <Typography useGap={false} fontStyle='italic'>
          cf.
        </Typography>
        <Typography useGap={false}>&nbsp;The man</Typography>
        <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          insisted
        </Typography>

        <Typography useGap={false}>that he&nbsp;</Typography>
        <Typography type='box'>was</Typography>
        <Typography useGap={false}>the first person to reach&nbsp;</Typography>
        <Typography useGap={false}>the North Pole.</Typography>

        <Box color='var(--color-blue-900)'>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            cf. 그 남자는 자신이 북극에 도달한 첫 번째 사람이었다고 주장했다.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
