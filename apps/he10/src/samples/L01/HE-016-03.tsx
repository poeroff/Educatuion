import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01603 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but String (전체 읽기)',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box background='white' useRound useFull>
        <Scroll>
          <Box vAlign='center' hAlign='center'>
            <PinchZoom pinchType={'image'}>
              <Image
                alt={
                  '남자 선생님이 개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 슬라이드를 설명하고 있다.이미지 제목 Dogs vs. Wolves (Case 1) 슬라이드 텍스트 Dogs followed Dr. Hare’s Gestures → found the cup with the food easily Wolves paid no attention to his gestures →​ struggled and chose cups randomly'
                }
                src={'/L01/C06/A03/P1-IMG-1.png'}
                width='320px'
                height='156.77px'
              />
            </PinchZoom>
          </Box>
          <Box marginTop={'24px'}>
            <Typography>
              Now let’s turn our attention to ourselves, Homo sapiens. How have we managed to survive for so long? Neanderthals existed together with
              Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default HE01603;
