import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Turning Out: The Science of Noise-Cancellation (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A06/HE1-L03-C06-A06-P01.mp3',
    captionSrc: '/L03/C06/A06/HE1-L03-C06-A06-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L03/C06/A06/HE1-L03-C06-A06-P01.jpg'}
              width='346px'
              height='200px'
              alt='관광지 매표소, 패스트푸드점의 드라이브 스루,가족이 타고 있는 자동차 안 모습들의 사진'
            />
          </PinchZoom>
        </Box>
        <Box>
          <Box hAlign={'center'} flexDirection='column'>
            <Typography weight={'var(--font-weight-bold)'}>Exploring the Technology</Typography>
            <Typography weight={'var(--font-weight-bold)'}>and Its Applications</Typography>
          </Box>
          <Box useFull background='white' useRound height={'350px'} marginTop={'10px'}>
            <Scroll height='100%' tabIndex={0}>
              Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket
              offices at tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an
              opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly.
              Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling
              headsets to improve communication between employees and customers by eliminating vehicle noise. These noise-cancelling headsets help
              drive-through employees take orders accurately. The same technology is also used for cars, whose audio systems generate waves to cancel
              out unpleasant sounds such as engine, wind, and road noise. Thanks to noise-cancelling devices, it is possible for drivers to focus on
              driving without being disturbed by distracting noises.
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
