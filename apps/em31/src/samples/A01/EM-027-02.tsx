import { Box, Typography, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, Divexplanation } from '@maidt-cntn/ui/math';
import arrow from '../../assets/example/ArrowFatRight.svg';

const EM02702 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '필요한 봉투 수 알아보기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' flexDirection='column'>
        <Typography weight={'var(--font-weight-bold)'} useGap={false}>
          10에서 2씩 5번 빼면 0이 됩니다.
        </Typography>
        <Box>
          <Typography weight={'var(--font-weight-bold)'} useGap={false}>
            이것을 나눗셈식으로 나타내면{' '}
          </Typography>
          <Typography weight={'var(--font-weight-extraBold)'} useGap={false}>
            10÷2=5
          </Typography>
          <Typography weight={'var(--font-weight-bold)'} useGap={false}>
            입니다.
          </Typography>
        </Box>

        <Box marginTop={'20px'}>
          <Divexplanation explanation count={5}>
            <Typography weight={'var(--font-weight-bold)'} useGap={false}>
              10-2-2-2-2-2=0
            </Typography>
            <SvgIcon src={arrow} size='32px' style={{ margin: '0 10px' }} />
            <Typography weight={'var(--font-weight-bold)'} useGap={false}>
              10÷2=
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} useGap={false} color='#EB1807'>
              5
            </Typography>
          </Divexplanation>
        </Box>
      </Box>
    </Container>
  );
};

export default EM02702;
