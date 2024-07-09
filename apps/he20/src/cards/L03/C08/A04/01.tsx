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
          <Image
            src={'/L03/C08/A04/HE2-L03-C08-A04-01.jpg'}
            width={'100%'}
            height={'63px'}
            alt='She even studied abroad in Paris, which was unusual for women at the time.
              She 부터 Paris까지 파란 색자로, 빨간 색자 which 가 이끄는 절이 하늘색 음영으로 강조되어 있다.'
          />
          <Image
            src={'/L03/C08/A04/HE2-L03-C08-A04-02.jpg'}
            width={'100%'}
            height={'63px'}
            alt='Lewis went to live with her aunt in Digby, where she met her future husband.
              Digby가 파란 색자로, 빨간 색자 where가 이끄는 절은 하늘색 음영으로 강조되어 있다.'
          />
        </Box>
        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <Box display='flex' alignItems='center'>
            <SvgIcon src={arrow} size='38px' />
            <Typography>
              I love novels written by{' '}
              <Typography weight='var(--font-weight-bold)' useGap={false} color='var(--color-blue-800)'>
                Ernest Hemingway
              </Typography>
              <Typography useGap={false} color='var(--color-red-800)' weight='var(--font-weight-bold)'>
                , whom
              </Typography>{' '}
              I admire more than any other writer.
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <SvgIcon src={arrow} size='38px' />
            <Typography>
              He will never forget
              <Typography useGap={false} color='var(--color-blue-800)' weight='var(--font-weight-bold)'>
                last Christmas
              </Typography>
              <Typography useGap={false} color='var(--color-red-800)' weight='var(--font-weight-bold)'>
                , when
              </Typography>{' '}
              he took a sleigh ride for the first time.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
