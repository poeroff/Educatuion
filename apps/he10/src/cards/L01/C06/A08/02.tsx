import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image, IAudioPlayerProps, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Deep Learning : How to Make Effective Slides',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A08/HE1-L01-C06-A08.mp3',
    captionSrc: '/L01/C06/A08/HE1-L01-C06-A08.srt',
  };

  const indent = '\u00A0'.repeat(3);

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='40%' hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L01/C06/A08/HE1-L01-C06-A08.jpg'} width='358px' height='207px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>첫번째 이미지는 슬라이드 전체에 풀밭에서 노는 예쁜 강아지가 배경으로 깔려있고 관련 내용이 배경 위로 길고 복잡하게 쓰여있다. </p>
              <p>두번째 이미지는 슬라이드에 제목구역, 내용 구역이 나눠져 있고 비교 대상이 명확하게 보인다.</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box width='60%' background='white' useRound useFull>
          <Scroll tabIndex={0}>
            <Box hAlign='center'></Box>
            <Box marginTop={'24px'}>
              <Typography>
                {indent}A successful presentation relies on employing various presentation skills, such as using friendly gestures, making natural eye
                contact, and speaking with an appropriate volume. But just as important, well-designed slides play a critical role in effectively
                conveying your message. Here are some useful tips for improving your presentation slides. First, adopt a “less is more” approach by
                keeping your slides simple. Limit each slide to five lines of text and use phrases instead of full sentences. This allows the audience
                to focus more on listening than on reading. Next, prioritize readability by carefully selecting attractive font sizes and colors. The
                best readability is generally achieved with a font size of at least 18 pt, and you should limit slides to three or four colors to
                avoid distraction. Lastly, enhance your slides with high-quality images that complement the text. By following these simple tips, you
                can create effective slides that hold your audience’s interest and keep them engaged from start to finish!
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
