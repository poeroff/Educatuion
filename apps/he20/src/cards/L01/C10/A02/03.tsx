import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P03 = () => {
  const contentImage = '/L01/C10/A02/HE2-L01-C10-A02-P03.jpg';

  const imageText =
    '양손에 눈과 날카로운 치아가 드러난 입을 그려 바이러스 형상을 표현한 포스터Your hands can be dangerous. wash them with soap and water to keep bacteria at bay.포스터 아래 여러 단체 기관들의 로고가 새겨져 있다.';

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
                  The Brazilian government started raisingawareness of viruses spread by people'shands. This PSA presents dangerous-looking hands to
                  depict a harmful virus and stresses the importance of washing hands.
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
