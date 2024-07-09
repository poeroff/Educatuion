import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P02 = () => {
  const contentImage = '/L04/C10/A02/HE2-L04-C10-A02-P02.jpg';

  const imageText = '열차가 유리관을 통해 공중으로 건물 사이를 다니는 모습 ';

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
                  Off to London for lunch on a super-fast vacuum tube train traveling at 6,000 kilometers per hour! Without air resistance, we can
                  travel there from Seoul in just 2 hours. And guess what? We cango anywhere in the world within 6 hours. Get ready for an incredible
                  adventure!
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
