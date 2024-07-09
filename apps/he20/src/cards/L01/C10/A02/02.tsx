import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P02 = () => {
  const contentImage = '/L01/C10/A02/HE2-L01-C10-A02-P02.jpg';

  const imageText =
    '버려진 종이컵으로 만든 개 모양 포스터“난 일회용이 아니에요“우리의 삶 속에서 함께 살아가는 반려동물. 일회용 종이컵처럼 쉽게 쓰고 가볍게 버리시나요? 그들은쉽게 쓰고 버려지는 일회용이 아니며 우리와 같이 생명의 존중을 받아야 하는 애완이 아닌 반려동물입니다.Kobaco 공익광고협의회';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Public Service Announcements for a Better World',
  };

  const questionInfo = {
    text: 'Check out the following public service announcements.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='180px' height='250px' alt='' />
            <Box type={'hidden'}>{imageText}</Box>
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <Box useFull background='white' useRound>
            <Scroll height='280px' tabIndex={101}>
              <Box>
                <Typography>
                  This PSA was a winner in the Public ServiceAdvertisement Contest from the KoreaBroadcast Advertising Corp. (KOBACO). It seeks to
                  convey the meaning that animals are not single-use objects to be thrown away like paper cups but companions that deserve protection.
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
