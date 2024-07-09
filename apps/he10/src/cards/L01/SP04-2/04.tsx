import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Typography weight='700' useGap={false}>
          1) 주격 관계대명사
        </Typography>
        <Box padding='8px 12px'></Box>
        <Box marginBottom={24}>
          <Typography>
            They set up{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
              a device
            </Typography>
            .{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
              The device
            </Typography>{' '}
            required two individuals to pull both ends of a rope at the same time.
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box paddingTop='12px'>
            <SvgIcon size='38px' src={arrow} alt='' />
          </Box>
          <Box>
            <Typography>
              They set up{' '}
              <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-bold)'} title='빈칸' useGap={false}>
                a device
              </Typography>{' '}
              [
              <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
                which
              </Typography>{' '}
              required two individuals to pull both ends of a rope at the same time.]
            </Typography>
            <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
              그들은 두 사람이 동시에 밧줄의 양쪽 끝을 잡아당겨야 하는 장치를 설치했다.{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
