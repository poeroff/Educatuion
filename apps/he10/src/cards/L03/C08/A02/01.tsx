import { Box, TMainHeaderInfoTypes, Typography, Image, SvgIcon } from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';

import arrow from '../../../../assets/icon/arrow_right.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };
  const imageURL = '/L03/C08/A02/HE1-L03-C08-A02-P01.jpg';
  const imageAltText =
    'Rarely do people want to put up wit a lot of noise 빨간 색자 Rarely, 파란 색자 Do, 초록 색자 people, 파란 색자 want가 각자와 이끄는 절을 수식하는 모습을 나타낸다.';

  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Box hAlign='center'>
          <Image src={imageURL} width={'755px'} height={'53px'} alt={imageAltText} tabIndex={101} />
        </Box>
        <Box display='flex' flexDirection='column' marginTop={'30px'}>
          <Box vAlign='flex-start' tabIndex={102}>
            <SvgIcon src={arrow} size='38px' />
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              <Typography color='var(--color-red-800)' useGap={false} title='빨간색 글자'>
                Never
              </Typography>{' '}
              <Typography color='var(--color-blue-800)' useGap={false} title='파란색 글자'>
                did
              </Typography>{' '}
              <Typography color='var(--color-green-800)' useGap={false} title='초록색 글자'>
                she
              </Typography>{' '}
              <Typography color='var(--color-blue-800)' useGap={false} title='파란색 글자'>
                dream
              </Typography>{' '}
              of becoming the world’s most popular movie star.
            </Typography>
          </Box>
          <Box vAlign='flex-start' marginTop={'20px'} tabIndex={103}>
            <SvgIcon src={arrow} size='38px' />
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              <Typography color='var(--color-red-800)' useGap={false} title='빨간색 글자'>
                At the top of the mountain
              </Typography>{' '}
              <Typography color='var(--color-blue-800)' useGap={false} title='파란색 글자'>
                were
              </Typography>{' '}
              <Typography color='var(--color-green-800)' useGap={false} title='초록색 글자'>
                a couple of climbers
              </Typography>{' '}
              drinking hot chocolate.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
