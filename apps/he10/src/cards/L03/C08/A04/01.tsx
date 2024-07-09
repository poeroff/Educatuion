import { Box, TMainHeaderInfoTypes, Image, SvgIcon, ESvgType, Typography, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center'>
        <PinchZoom>
          <Image
            src='/L03/C08/A04/HE1-L03-C08-A04.jpg'
            width={'100%'}
            alt={`
              It is possible for drivers to focus on driving without being disturbed
              It, to focus가 빨간 색자로, for drivers가 파란 색자로 표현되어있다.
            `}
          />
        </PinchZoom>
      </Box>
      <Box vAlign='center' width='100%' marginTop='35px'>
        <Box height='100%' paddingTop='4px'>
          <SvgIcon src={simpleRightArrow} type={ESvgType.IMG} />
        </Box>
        <Typography>
          <Typography useGap={false} color='var(--color-red-800)' fontWeight='var(--font-weight-bold)'>
            It&nbsp;
          </Typography>
          is very important&nbsp;
          <Typography useGap={false} color='var(--color-blue-800)' fontWeight='var(--font-weight-bold)'>
            for children&nbsp;
          </Typography>
          <Typography useGap={false} color='var(--color-red-800)' fontWeight='var(--font-weight-bold)'>
            to get&nbsp;
          </Typography>
          enough sleep for their growth.
        </Typography>
      </Box>
      <Box vAlign='center' width='100%' marginTop='24px'>
        <Box height='100%' paddingTop='4px'>
          <SvgIcon src={simpleRightArrow} type={ESvgType.IMG} />
        </Box>
        <Typography>
          <Typography useGap={false} color='var(--color-red-800)' fontWeight='var(--font-weight-bold)'>
            It&nbsp;
          </Typography>
          is pleasant&nbsp;
          <Typography useGap={false} color='var(--color-blue-800)' fontWeight='var(--font-weight-bold)'>
            for students&nbsp;
          </Typography>
          <Typography useGap={false} color='var(--color-red-800)' fontWeight='var(--font-weight-bold)'>
            to share&nbsp;
          </Typography>
          their favorite activities with their friends.
        </Typography>
      </Box>
    </Container>
  );
};

export default P01;
