import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P02 = () => {
  const contentImage = '/L04/C10/A02/HE1-L04-C10-A02-P02.jpg';

  const imageText = '여성이 플라스틱 병을 재활용용기에 버리는 모습';

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
                1. Recycling Vending Machines
              </Typography>
            </Box>
            <Box>
              <Scroll height='300px' tabIndex={0}>
                <Box>
                  <Typography>
                    In Turkiye, there are special machines that both collect recyclable waste and feed street animals. When people put plastic bottles
                    into the machine, it releases food and water for the animals. This thoughtful approach ensures a brighter future for the well-
                    being of street animals and the environment.
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
