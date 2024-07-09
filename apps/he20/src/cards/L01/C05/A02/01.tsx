import { IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
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
      <VideoPlayer videoSrc={'/L01/C05/A02/HE2-L01-C05-A02.mp4'} srtFile={''} />
    </Container>
  );
};

export default P01;
