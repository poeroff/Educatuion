import { Box, EStyleFontSizes, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box marginBottom={24}>
        <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빈칸'>
          To focus on driving without being disturbed
        </Typography>
        <Typography>is possible for drivers.</Typography>
        <SvgIcon size='38px' src={arrow} />
        <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
          It
        </Typography>
        <Typography>is possible for drivers</Typography>
        <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빈칸'>
          to focus on driving without being disturbed.
        </Typography>
        <Box color='var(--color-blue-900)'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>운전자가 방해 받지 않고 운전에 집중할 수 있다.</Typography>
        </Box>
      </Box>
      <Box padding='8px 12px'>
        <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
        <Typography>
          to부정사(구)의 의미상 주어를 명시할 때는 {'<'}for+목적격{'>'}으로 나타낸다.
        </Typography>
        <Typography>It is very important</Typography>
        <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
          for children
        </Typography>
        <Typography>to get enough sleep for their growth.</Typography>
      </Box>
      <Box color='var(--color-blue-900)'>아이들의 성장을 위해 충분한 수면을 취하는 것은 매우 중요하다.</Box>
    </Container>
  );
};

export default P04;
