import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';

const P01 = () => {
  const contentImage = '/L01/C10/A02/HE2-L01-C10-A02-P01.jpg';

  const imageText =
    '산이 그려져 있는 계단 For some, it’s Mt. Everest.Help build more handicap facilities.포스터 아래 미국 장애인 협회 로고가 새겨져 있다';

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
                  This public service announcement (PSA),promoted by the American Disability Association, was placed on steps with the message: “ For
                  some, it’s Mt. Everest.” It helps people better understand the challenges faced by individuals with disabilities and emphasizes the
                  importanceof having more convenient facilities.
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
