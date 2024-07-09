import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

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
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
              The athlete
            </Typography>{' '}
            broke the world record.
            <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
              He
            </Typography>{' '}
            has inspired other players.
          </Typography>
          <Box>
            <Typography size={EStyleFontSizes.SMALL}>
              {'<'}
              <Typography ariaDescribedby='content-01-01'>The atelete</Typography> = <Typography id='content-01-01'>He</Typography>
              {'>'}
            </Typography>
          </Box>
          <Box color='var(--color-grey-700)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>그 운동선수는 세계 기록을 깼다. 그는 다른 선수들에게 영감을 주었다.</Typography>
          </Box>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box paddingTop='12px'>
            <SvgIcon size='38px' src={arrow} alt='' />
          </Box>
          <Box>
            <Typography>
              <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-bold)'} title='빈칸' useGap={false}>
                The athlete
              </Typography>{' '}
              [
              <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
                who
              </Typography>{' '}
              broke the world record] has inspired other players.
            </Typography>
            <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
              세계 기록을 깬 그 운동선수는 다른 선수들에게 영감을 주었다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
