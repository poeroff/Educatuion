import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import styled from '@emotion/styled';

const P01 = () => {
  const contentImage = '/L04/C10/A02/HE2-L04-C10-A02-P01.jpg';

  const imageText = '건물 위에 로켓이 있는 모습';

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
            <Image src={contentImage} width='180px' height='250px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <Box useFull background='white' useRound>
            <Scroll height='280px' tabIndex={101}>
              <Box>
                <Typography>
                  As space exploration progresses, we will gain valuable resources from the Moon, Mars, and other planets. These resources include
                  rare metals for advanced electronics and 3He for nuclear energy. Furthermore, we will be able to build refueling stations which can
                  serve as gas stations for long-distance space travel!
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>

      <PositionFix>
        <Typography size={EStyleFontSizes.SMALL}>※ 3He:헬륨</Typography>
      </PositionFix>
    </Container>
  );
};

const PositionFix = styled.div`
  position: absolute;
  right: 15px;
  bottom: 0;
`;

export default P01;
