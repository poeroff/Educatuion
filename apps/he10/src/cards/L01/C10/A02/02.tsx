import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
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
              <Image
                alt={'영화 The intouchables 포스터 이미지 Now Showing'}
                src={'/L01/C10/A02/HE1-L01-C10-A02-P01-02.jpg'}
                width='150px'
                height='156.77px'
              />
            </PinchZoom>
          </Box>
          <Box marginTop='8px' padding='4px 12px'>
            <Typography useGap={false}>
              This feel-good movie is based on a true story about the friendship between Philippe, a rich man with a disability, and Driss, a poor man
              taking care of him. Their friendship bridges social differences and changes their lives in a meaningful way.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P02;
