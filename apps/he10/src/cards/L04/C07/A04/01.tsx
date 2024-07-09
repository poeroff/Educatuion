import { Box, IAudioPlayerProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };

  const questionInfo = {
    text: 'Search for efforts by governments and companies around the world to recycle spent coffee grounds. Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C07/A04/HE1-L04-C07-A04-P01.mp3',
    captionSrc: '/L04/C07/A04/HE1-L04-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box marginTop='20px' alignContent='center'>
        <PinchZoom>
          <Image
            src={'/L04/C07/A04/HE1-L04-C07-A04-P01.jpg'}
            alt='컴퓨터 모니터를 확대하여 비추고 있는 돋보기 A company in the Netherlands is taking action to recycle spent coffee grounds. It collects coffee grounds from organizations that consume more than 600 cups of coffee or 5 kg of coffee beans per week. With the collected coffee grounds, it makes products like cups, flower pots, and business cards and sells them online.'
            height='290px'
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P01;
