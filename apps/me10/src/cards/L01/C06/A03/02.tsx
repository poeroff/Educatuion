import { Box, IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (전체 읽기)',
  };

  const questionInfo: IQuestionProps = {
    text: '영상을 보며 다시 한번 읽어 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box height={'90%'}>
        <VideoPlayer videoSrc='/L01/C06/A03/ME1-L01-C06-A03-P01.mp4' srtFile={'/L01/C06/A03/ME1-L01-C06-A03-P01.srt'} />
      </Box>
    </Container>
  );
};
export default P02;
