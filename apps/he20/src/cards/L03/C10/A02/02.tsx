import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P02 = () => {
  const contentImage = '/L03/C10/A02/HE2-L03-C10-A02-P02.jpg';

  const imageText = '프랑스 파리에 위치한 오시 박물관의 실내 풍경 사진';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Museums Around the World',
  };

  const questionInfo = {
    text: 'Take a look at some of the world’s most incredible museums.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='180px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <Box useFull background='white' useRound>
            <Scroll height='280px' tabIndex={101}>
              <Box>
                <Typography>
                  Once a train station, this museum is renowned for its stunning original station clock and houses the world’s largest collection of
                  Impressionist andPost-Impressionist artworks. Among its notable pieces are Monet’s The Saint-Lazare Station , Van Gogh’sStarry Night
                  , and Degas’ sculpture Little Dancer Aged Fourteen.
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
