import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P03 = () => {
  const contentImage = '/L03/C10/A02/HE1-L03-C10-A02-P03.jpg';
  const imageText = 'Houfeng Didong Yi 네 마리의 개구리와 위에 개구리가 있는 청동 화병';

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
                The earliest device to detect
              </Typography>
            </Box>
            <Box>
              <Scroll height='300px' tabIndex={0}>
                <Box>
                  <Typography>
                    This Chinese device from the 2nd century is known as the earliest tool for detecting earthquakes. It consists of a large pot with
                    eight dragon heads, each holding a ball, and eight frogs at the base. When the ground shook, a ball would drop into a frog’s
                    mouth, showing the direction of the shaking.
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

export default P03;
