import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '활동',
  };
  const questionInfo = {
    text: 'Read the summaries of the following movies.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          <Box hAlign='center'>
            <PinchZoom pinchType={'image'}>
              <Image alt={'영화 COCO의 포스터 이미지 Now Showing'} src={'/L01/C10/A02/HE1-L01-C10-A02-P01-01.jpg'} width='150px' height='156.77px' />
            </PinchZoom>
          </Box>
          <Box marginTop='8px' padding='4px 12px'>
            <Typography>
              This movie celebrates family and Mexican culture through the story of Miguel and his great-grandmother, Coco. Miguel is magically
              transported to the Land of the Dead, where he meets his ancestors and learns about the strong connections across the generations.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
