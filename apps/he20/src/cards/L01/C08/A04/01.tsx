import { Box, TMainHeaderInfoTypes, Image, Typography, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box useFull hAlign='center' padding='50px 0px' height='100%' flexDirection='column' gap='20px'>
        <Box>
          <Image src={'/L01/C08/A04/HE2-L01-C08-A04.jpg'} height={'63px'} alt='' ariaDescribedby='img_desc' />
          <Box type='hidden' id='img_desc'>
            <p>Some dehydrated birds had fallen out of the sky and were brought to the sky and were brought to the center.</p>
            <p>빨간 색자로 had fallen 이, 파란 색자로 were brought 이 강조되어 있다.</p>
          </Box>
        </Box>

        <Box display='flex' width={'100%'}>
          <Typography>
            <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
            My dad{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              had
            </Typography>{' '}
            already{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              prepared
            </Typography>{' '}
            lunch when I{' '}
            <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              arrived
            </Typography>{' '}
            home.
          </Typography>
        </Box>

        <Box display='flex' width={'100%'}>
          <Typography>
            <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
            Ferdi{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              had
            </Typography>{' '}
            never{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              seen
            </Typography>{' '}
            snow before he{' '}
            <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              moved
            </Typography>{' '}
            to Korea from Indonesia.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
