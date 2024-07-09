import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P01 = () => {
  const contentImage = '/L03/C10/A02/HE1-L03-C10-A02-P01.jpg';
  const imageText = 'Yakhchal 키르기스스탄의 야크칠 지역에서 촬영된 사진';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Inventions Ahead of Their Time PAST',
  };

  const questionInfo = {
    text: 'Learn about remarkable A inventions from ancient history.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='250px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <TextBoard color={'var(--color-yellow-500 )'} width='600px'>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} color='var(--color-white)' weight={'var(--font-weight-extraBold)'}>
                The ancient refrigerator without electricity
              </Typography>
            </Box>
            <Box>
              <Scroll height='300px' tabIndex={0}>
                <Box>
                  <Typography>
                    In the 4th century B.C.E., Persians in the desert constructed dome-shaped buildings to store ice. These structures had cooling
                    systems made of heat-resistant materials such as sand and clay. As water dried up inside, hot air would flow out through the
                    opening at the top, cooling the inner space. This made it possible to preserve ice, and therefore food as well, for long periods
                    of time.
                  </Typography>
                </Box>
              </Scroll>
            </Box>
          </TextBoard>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
