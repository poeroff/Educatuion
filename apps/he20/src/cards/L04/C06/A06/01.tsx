import { Box, TMainHeaderInfoTypes, BoxWrap, IAudioPlayerProps, PinchZoom, Image, Scroll, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A06/HE2-L04-C06-A06-P01.mp3',
    captionSrc: '/L04/C06/A06/HE2-L04-C06-A06-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='370px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C06/A06/HE2-L04-C06-A06-P01.jpg'}
              width='370px'
              height='200px'
              alt='검정색 후트티를 입은 채 얼굴 은 보이지 않는 사람이 컴퓨터 로 무언가 해킹하고 있는 모습과 그 옆에 여성의 옆모습 사진'
              title='검정색 후트티를 입은 채 얼굴 은 보이지 않는 사람이 컴퓨터 로 무언가 해킹하고 있는 모습과 그 옆에 여성의 옆모습 사진'
            />
          </PinchZoom>
        </Box>
        <Box>
          <Box useFull background='white' display='flex' flexDirection='column' marginTop={'10px'} height={'410px'} useRound>
            <Scroll height='100%'>
              <Box display='flex' flexDirection='column' tabIndex={104}>
                <Typography tabIndex={105}>
                  Before we can fully embrace the era of AI-powered neural implants, many tricky ethical issues should be addressed. The integration
                  of AI technology with the human brain raises concerns about what it means to be human. Our brains are believed to be central to our
                  identity, existence, and value as human beings. However, an over-reliance on technology may delay our natural development and create
                  confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk that
                  organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts,
                  emotions, and behaviors could be controlled by hackers. There’s an additional risk that this technology could lead to even greater
                  social inequality, given that it may not be available to all due to its high cost. Such unequal access to the technology could
                  intensify the division between those who can afford the implants and those who cannot.
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
