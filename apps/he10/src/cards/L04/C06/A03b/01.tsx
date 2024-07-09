import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A03/HE1-L04-C06-A03-P01.mp3',
    captionSrc: '/L04/C06/A03/HE1-L04-C06-A03-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C06/A03/HE1-L04-C06-A03-01.jpg'}
              width='278px'
              height='300px'
              alt='네 사람이 탁자에 둘러앉아 커피를 마시며 재미있게 이야기를 나누고 있다.'
            />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%' tabIndex={0}>
            The famous German musician Johann Sebastian Bach once said, “Without my morning coffee, I’m just like a dried-up piece of goat.” Today
            this sentiment is shared by many, with coffee shops springing up on almost every street corner, and it is common to see city residents
            walking around with a cup of coffee in hand. According to the International Coffee Organization (ICO), approximately 10 billion tons of
            coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780
            tons of coffee. This means that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly, for
            Koreans and other world citizens, coffee is not just a drink but a daily necessity.
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
