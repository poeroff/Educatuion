import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P04 = () => {
  const contentImage = '/L04/C10/A02/HE1-L04-C10-A02-P04.jpg';

  const imageText = '밭에 있는 소들';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Green Policies Around the World',
  };

  const questionInfo = {
    text: 'Learn about green policies around the world.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='200px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <TextBoard color={'var(--color-yellow-500 )'} width='600px'>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} color='var(--color-white)' weight={'var(--font-weight-extraBold)'}>
                2. Cow Gas Tax
              </Typography>
            </Box>
            <Box>
              <Scroll height='260px'>
                <Box>
                  <Typography>
                    In Estonia, taxes are applied to the greenhouse gases emitted by cows. On average, a cow emits around 350 liters of methane per
                    day. This tax aims to reduce the environmental impact of cow farming and combat climate change.
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

export default P04;
