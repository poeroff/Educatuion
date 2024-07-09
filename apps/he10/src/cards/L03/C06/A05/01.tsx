import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A05/HE1-L03-C06-A05-P01.mp3',
    captionSrc: '/L03/C06/A05/HE1-L03-C06-A05-P01.srt',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L03/C06/A05/HE1-L03-C06-A05-P01.jpg'}
              width='346px'
              height='200px'
              alt='노이즈캔슬링 헤드폰의 작동 원리를 설명하는 그림​ Noise Microphone Noise-Cancelling Circuitry Speaker Reduced Noise Level'
              title='노이즈캔슬링 헤드폰의 작동 원리를 설명하는 그림​ Noise Microphone Noise-Cancelling Circuitry Speaker Reduced Noise Level'
            />
          </PinchZoom>
        </Box>
        <Box>
          <Box hAlign={'center'} flexDirection={'column'}>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              The Science Behind
            </Typography>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              Noise-Cancelling Headphones
            </Typography>
          </Box>
          <Box useFull useRound background='white' height={'384px'}>
            <Scroll height='100%' tabIndex={0}>
              <Box>
                <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                  Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are
                  microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to
                  produce opposite sound waves. For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of -1
                  and transmit it to the speakers. This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound
                  clearly without turning up the volume. However, it is not easy to entirely eliminate external noise with this technology. To achieve
                  full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the
                  speakers as soon as the noise reaches the microphones. Therefore, this noise-cancellation technology is effective for predictable
                  sounds like those of car engines and subways that occur regularly or over a period of time. However, it’s relatively less effective
                  for inconsistent sounds such as those of people talking close to you.
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
