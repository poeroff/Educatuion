import { Box, IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Watch the video.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box height={'90%'}>
        <VideoPlayer videoSrc='/L01/C05/A02/HE1-L01-C05-A02.mp4' srtFile={'/L01/C05/A02/HE1-L01-C05-A02.srt'} />
      </Box>
    </Container>
  );
};

export default P01;
