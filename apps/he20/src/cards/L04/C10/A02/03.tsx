import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P03 = () => {
  const contentImage = '/L04/C10/A02/HE2-L04-C10-A02-P03.jpg';

  const imageText = '로봇이 주문한 음식을 서빙하는 모습';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What Will Our Future Look Like?',
  };

  const questionInfo = {
    text: 'Look at the picture and imagine how our lives might be in the future.',
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
                  Prepare for the era of smart home robots! They will be our companions and household helpers. They can learn human behaviors,
                  languages, and emotions through the use of AI. Imagine robots that can talk just like family members or friends! As they become more
                  popular, the demand for jobs like robot developer will increase significantly.
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P03;
