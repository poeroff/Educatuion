import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Typography weight='700' useGap={false}>
          2) 목적격 관계대명사: 목적격 관계대명사는 생략할 수 있다.
        </Typography>
        <Box padding='8px 12px'></Box>
        <Box marginBottom={24}>
          <Typography>
            We interviewed{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
              the economists
            </Typography>
            .{' '}
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
              They
            </Typography>{' '}
            predicted the economy will flourish next year.
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box paddingTop='12px'>
            <SvgIcon size='38px' src={arrow} alt='' />
          </Box>
          <Box>
            <Typography>
              <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-bold)'} title='빈칸' useGap={false}>
                The economists
              </Typography>{' '}
              [
              <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
                (who(m))
              </Typography>{' '}
              we interviewed] predicted the economy will flourish next year.
            </Typography>
            <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
              우리가 인터뷰한 경제학자는 내년 경제가 호황을 누릴 것이라고 전망했다.{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P05;
