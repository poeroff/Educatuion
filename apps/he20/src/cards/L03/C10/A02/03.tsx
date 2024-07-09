import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P03 = () => {
  const contentImage = '/L03/C10/A02/HE2-L03-C10-A02-P03.jpg';

  const imageText = '이집트 기자의 박물관에 전시된 그랜드 이 집션 사진';

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
                  With a view of the pyramids of Giza, this museum stands as one of the world’s largest ancient history museums. You will see a huge
                  stone sculpture of Pharaoh Rameses II at the entrance and have the opportunity to appreciate the complete collection of King
                  Tutankhamun, along with about 100,000 other rare and unique objects.
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
