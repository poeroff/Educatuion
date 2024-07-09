import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '활동',
  };
  const questionInfo = {
    text: 'Read the summaries of the following movies.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box background='white' useRound useFull height={'406px'}>
        <Scroll height='100%' tabIndex={0}>
          <Box hAlign='center'>
            <PinchZoom pinchType={'image'}>
              <Image
                alt={'영화 wonder의 포스터 이미지 Now Showing'}
                src={'/L01/C10/A02/HE1-L01-C10-A02-P01-03.jpg'}
                width='150px'
                height='156.77px'
              />
            </PinchZoom>
          </Box>
          <Box marginTop='8px' padding='4px 12px'>
            <Typography useGap={false}>
              This movies is adapted from a novel that explores the relationships of a young boy named Auggie, who has a unique appearance. The stroy
              beautifully portrays his bond with his family and friends and emphasizes the importance of acceptance, kindness, and true friendship.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P03;
