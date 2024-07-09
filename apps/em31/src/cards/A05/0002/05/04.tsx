import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '길이 나타내기',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={null}>
      <Box hAlign='center' flexDirection='column'>
        <Box width='80%' margin='24px 0'>
          <Typography useGap={false} align='center' lineHeight='42px'>
            3 cm보다 7 mm 더 긴 길이를{' '}
            <Typography color='var(--color-red-700)' weight='var(--font-weight-bold)' useGap={false} title='빨간색 글자'>
              3 cm 7 mm
            </Typography>{' '}
            라 쓰고&nbsp;
            <Typography color='var(--color-red-700)' weight='var(--font-weight-bold)' useGap={false} title='빨간색 글자'>
              3 센티미터 7 밀리미터
            </Typography>{' '}
            라고 읽습니다.
          </Typography>
        </Box>
        <Box backgroundColor='var(--color-white)' padding='4px 24px' borderRadius={16}>
          <Typography fontSize='36px' lineHeight='54px'>
            3 cm 7 mm = 37 mm
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
