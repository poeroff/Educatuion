import { Box, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo: IQuestionProps = {
    text: 'Think and talk about ways to raise awareness about dark patterns. Check out the example.',
    size: 'medium',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C07/A04/HE2-L02-C07-A04-P01.mp3',
    captionSrc: '/L02/C07/A04/HE2-L02-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box hAlign='center' useFull>
        <PinchZoom>
          <Image
            src='/L02/C07/A04/HE2-L02-C07-A04-P01.jpg'
            alt='대화를 나누고 있는 남학생과 여학생 남학생 말풍선 속 글자 : We can make a short video about the dangers of dark patterns and post it on social media. 여학생 말풍선 속 글자: We can…'
            width='696px'
            height='274px'
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P01;
