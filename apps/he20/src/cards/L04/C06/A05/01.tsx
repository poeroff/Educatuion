import { Box, TMainHeaderInfoTypes, BoxWrap, IAudioPlayerProps, PinchZoom, Image, Scroll, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A05/HE2-L04-C06-A05-P01.mp3',
    captionSrc: '/L04/C06/A05/HE2-L04-C06-A05-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='370px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C06/A05/HE2-L04-C06-A05-P01.jpg'}
              width='370px'
              height='200px'
              alt='뇌에 AI 칩이 심어진 여성의 그림. 사진, 책, 게임, 메신저 그림이 여성의 뇌와 연결되어 있다.'
            />
          </PinchZoom>
        </Box>
        <Box>
          <Box useFull background='white' marginTop={'10px'} height={'410px'} useRound>
            <Scroll height='100%' tabIndex={0}>
              <Typography>
                The success of AI-powered neural implants in health care is also expected to spread to other industries. Some futurists predict that
                these implants will become commercially available in the next 20 to 30 years and significantly change our daily lives. For example,
                advances in neural implant technology will make it possible to install in our brains software that can read our minds. This could
                enable us to play games, type social media messages, and stream music simply by thinking. There is also great potential for
                memory-enhancing brain implants, similar to computer memory chips. Such devices would allow us to capture and enhance memories, and
                even upload and download them using the digital cloud. We could look through our memories like a social media feed, vividly recall our
                favorite life moments, share memories with others, and back up our most valuable memories. Finally, AI-powered neural implants would
                revolutionize the way our brains work. The role of the brain would shift from learning and storing information to processing the vast
                amounts of data provided by the implants. Instead of simply memorizing information, we would be able to download knowledge, use our
                creativity to interpret it, and generate new ideas.
              </Typography>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
