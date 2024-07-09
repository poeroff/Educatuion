import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P01 = () => {
  const contentImage = '/L03/C10/A02/HE2-L03-C10-A02-P01.jpg';

  const imageText = '워싱턴D.C.에 있는 스미스소니언 국립 자연사 박물관에 전시된 거대한 동물 뼈 사진';

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
                  From towering T-rex bones to fascinating ancient mummies, this museum covers a wide range of topics, including ancient life,
                  geology, and much more. On entering the museum, you will see a magnificent elephant on display. You can also experience the wonders
                  of geological processes through the mineralexhibit.
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
