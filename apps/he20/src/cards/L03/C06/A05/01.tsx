import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A05/HE2-L03-C06-A05-P01.mp3',
    captionSrc: '/L03/C06/A05/HE2-L03-C06-A05-P01.srt',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={'/L03/C06/A05/HE2-L03-C06-A05-P01.jpg'} width='346px' height='200px' alt='벽면에 전시되어 걸려있는 Maud Lewis의 그림 세 점' />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll tabIndex={0} height='100%'>
            &nbsp;&nbsp;&nbsp; Next, we have Maud Lewis, a renowned artist known for her heart-warming paintings. Born in a small Canadian town in
            1903, Lewis suffered from physical weaknesses such as distorted shoulders and fingers. This limited her mobility and caused her to drop
            out of school. To make a living, she began to paint and sell Christmas cards. When her parents passed away, Lewis went to live with her
            aunt in Digby, Nova Scotia, where she met her future husband, Everett Lewis. After marrying, the couple spent the rest of their lives
            there, and Lewis continued to paint. She often depicted the Digby landscapes in paintings such as Edge of Digby Harbor. Her artwork used a
            mixture of bright and vivid oil paints and simple forms, generating an original, innovative style. Although her physical limitations
            confined her to a small cottage, her talent and imagination were both limitless. In Red Sleigh, red maple leaves appear on a special
            winter landscape, and Pair of Oxen shows decorated cows standing in a flower field. With these features, Lewis’ paintings create a magical
            quality, like that of a fairy tale. As her paintings gradually gained popularity, her story inspired many people and was later made into
            books and movies. Maud Lewis expressed her love for the world through her paintings and became an iconic figure in Canadian folk art.
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
