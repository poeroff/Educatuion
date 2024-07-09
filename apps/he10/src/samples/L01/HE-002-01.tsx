import { TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import sampleVideoSource from '@maidt-cntn/assets/example/sample_video.mp4';

const HE00201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What is most important when communicating with others?',
  };
  return (
    <Container headerInfo={headerInfo}>
      {/* <VideoPlayer videoSrc={sampleVideoSource} srtFile={''} /> */}
      <iframe src='https://devqr.mirae-n.com/8ZSq4' width={'100%'} height={'100%'} />
    </Container>
  );
};

export default HE00201;
