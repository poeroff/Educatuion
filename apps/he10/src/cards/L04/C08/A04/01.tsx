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
          <Image src={'/L04/C08/A04/HE1-L04-C08-A04.jpg'} width={'100%'} />
          <Box type='hidden'>
            Reusable cups not only have an appealing appearance but (also) preserve the taste of the coffee. Not only, but (also)가 빨간 색자로, have,
            preserve가 파란 색자로 강조되어 문장의 구조를 나타내고 있다.
          </Box>
        </Box>

        <Box display='flex' alignItems='center' width={'100%'}>
          <Typography>
            <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
            <Typography>They could find their cat </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
              neither &nbsp;
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
              in the living room &nbsp;
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
              nor &nbsp;
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
              in the kitchen.
            </Typography>{' '}
          </Typography>
        </Box>

        <Box display='flex' width={'100%'}>
          <Typography>
            <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
            <Typography>What truly matters in life is </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
              not &nbsp;
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
              others’ opinion &nbsp;
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
              but &nbsp;
            </Typography>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
              your own perspective.
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
