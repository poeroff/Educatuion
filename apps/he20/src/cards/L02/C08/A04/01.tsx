import { Box, TMainHeaderInfoTypes, Image, Typography, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@maidt-cntn/assets/icons/arrow-icon.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box>
          <Image src={'/L02/C08/A04/HE2-L02-C08-A04.jpg'} width={'811px'} />
          <Box type='hidden'>
            alt='Critics suggest that a marketing strategy create value for both companies and customers. 빨간 색자로 suggest 가 강조되어 있고 that
            이하가 하늘색 음영으로 강조되어 있다 . 파란 색자 create 는 그 앞의 should 가 생략되어 원형임을 나타낸다'
          </Box>
        </Box>

        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <Box display='flex' alignItems='flex-start'>
            <div style={{ width: '40px', height: '40px' }}>
              <SvgIcon src={arrow} size='30px' style={{ verticalAlign: 'top' }}></SvgIcon>
            </div>

            <Typography useGap={false}>
              The doctor
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                &nbsp;suggested&nbsp;
              </Typography>
              that the patient
              <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                &nbsp;(should) exercise&nbsp;
              </Typography>
              for at least minutes every day.
            </Typography>
          </Box>

          <Box>
            <Typography fontStyle={'italic'} useGap={false}>
              cf.
            </Typography>{' '}
            Research{' '}
            <Typography weight={'var(--font-weight-bold)'} useGap={false}>
              suggests
            </Typography>{' '}
            that too much exercise is harmful to our health.
          </Box>
        </Box>
        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <Box display='flex' alignItems='flex-start'>
            <div style={{ width: '40px', height: '40px' }}>
              <SvgIcon src={arrow} size='30px' style={{ verticalAlign: 'top' }}></SvgIcon>
            </div>
            <Typography useGap={false}>
              Mary
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                &nbsp;insisted&nbsp;
              </Typography>
              that we
              <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                &nbsp;(should) complete&nbsp;
              </Typography>
              the task quickly, but we couldn’t.
            </Typography>
          </Box>
          <Box>
            <Typography fontStyle={'italic'}>cf.</Typography> The man{' '}
            <Typography weight={'var(--font-weight-bold)'} useGap={false}>
              &nbsp;insisted&nbsp;
            </Typography>{' '}
            that he was the first person to reach the North Pole.
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
