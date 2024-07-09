import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P02 = () => {
  const contentImage = '/L03/C10/A02/HE1-L03-C10-A02-P02.jpg';
  const imageText = 'Antikythera Mechanism 안티키테라 기구 고대 세계의 기계';

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
                A 2,200-year-old computer
              </Typography>
            </Box>
            <Box>
              <Scroll height='300px' tabIndex={0}>
                <Box>
                  <Typography>
                    This device was discovered in a sunken ship near Antikythera, Greece. It was probably created around the 2nd century B.C.E. It was
                    used to predict the positions of the Sun, the Moon, and stars and to calculate cycles of special events like the ancient Olympics.
                    With a complex design containing over 30 gears, it is considered the world’s first computer.
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

export default P02;
