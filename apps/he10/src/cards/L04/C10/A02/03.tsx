import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P03 = () => {
  const contentImage = '/L04/C10/A02/HE1-L04-C10-A02-P03.jpg';

  const imageText = 'BUY NOTHING DAY 라고 적힌 종이가방';

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
                2. Buy Nothing Day
              </Typography>
            </Box>
            <Box>
              <Scroll height='300px'>
                <Box>
                  <Typography>
                    Starting in Canada, “Buy Nothing Day” typically occurs on the same day as the big shopping day called “Black Friday,” the fourth
                    Friday of November. On this day, people are encouraged to stop shopping for 24 hours. The day is intended to raise awareness of
                    ethical consumption.
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
