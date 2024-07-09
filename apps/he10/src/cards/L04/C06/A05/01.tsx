import { Box, BoxWrap, IAudioPlayerProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A05/HE1-L04-C06-A05-P01.mp3',
    captionSrc: '/L04/C06/A05/HE1-L04-C06-A05-P01.srt',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C06/A05/HE1-L04-C06-A05-P01.jpg'}
              width='346px'
              height='200px'
              alt='커피머신에서 커피 찌꺼기를 분리해내고 있는 사진'
              title='커피머신에서 커피 찌꺼기를 분리해내고 있는 사진'
            />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%' tabIndex={0}>
            <Typography>
              So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and
              sent to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some
              SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management
              options takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals,
              they are simply destroyed.
            </Typography>
            <br />
            <br />
            <Typography>
              Fortunately, thanks to increased awareness of the coffee waste problem, companies, organizations, and governments around the world are
              working hard to improve the environmental impact of the coffee industry through circular economy measures. A circular economy promotes
              the reuse of resources for as long as possible, reducing waste and environmental costs.
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
