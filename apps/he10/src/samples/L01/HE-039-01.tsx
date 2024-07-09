import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const HE03901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box marginBottom={24}>
        <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          The athlete
        </Typography>
        <Typography useGap={false}>who broke the world record.</Typography>
        <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          He
        </Typography>
        <Typography useGap={false}>&nbsp;has inspired other players.</Typography>
        <Box>
          <Typography fontSize='22px'>
            {'<'}The atelete = He{'>'}
          </Typography>
        </Box>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>그 운동선수는 세계 기록을 깼다. 그는 다른 선수들에게 영감을 주었다.</Typography>
        </Box>
      </Box>
      <Box vAlign='center'>
        <SvgIcon size='38px' src={arrow} />
        <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          The athlete
        </Typography>
        [
        <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빨간색 글자'>
          who
        </Typography>
        <Typography useGap={false}>&nbsp;broke the world record] has inspired other players.</Typography>
      </Box>
      <Box color='var(--color-blue-900)'>
        <Typography size={EStyleFontSizes['X-MEDIUM']}>세계 기록을 깬 그 운동선수는 다른 선수들에게 영감을 주었다.</Typography>
      </Box>
    </Container>
  );
};

export default HE03901;
