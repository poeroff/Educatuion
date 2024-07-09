import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01602 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A05/HE1-L02-C06-A05-P01.mp3',
    captionSrc: '/L02/C06/A05/HE1-L02-C06-A05-P01.srt',
    right: 10,
    top: -10,
  };

  const content: React.ReactNode = (
    <Typography>
      &nbsp;When I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was.“Look, Nani,” I said. “I’m not taking you anywhere. You
      could die on me!” Nani looked at me in anger. “You want me to die here in this room? Looking at these four walls? When the whakapapa is not yet
      finished?” The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but he tried to
      walk. I could not help but carry him to the car, and we set off with Auntie. We traveled all night, mostly in silence, listening to Nani
      chanting in the darkness. It was strange but wonderful to hear him. Sometimes, he burst into a song that he had taught Auntie. They sang
      together, lifting up their voices to send the song flying like a bird through the sky.
    </Typography>
  );

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L02/C06/A05/HE1-L02-C06-A05-P01.jpg'}
              width='346px'
              height='200px'
              alt='밤길에 남자가 운전하는 자동차 뒷 좌석에 이모와 할아버지가 타고 노래를 부르고 있다.'
              title='밤길에 남자가 운전하는 자동차 뒷 좌석에 이모와 할아버지가 타고 노래를 부르고 있다.'
            />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%'>{content}</Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE01602;
