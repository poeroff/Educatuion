import { IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const questionInfo: IQuestionProps = {
    text: '영상을 보며 대화 내용을 다시 한번 확인해 봅시다.',
  };

  const videoSrc = '/L01/C02/A03/ME1-L01-C02-A03-P03.mp4';
  const srtFile = '/L01/C02/A03/ME1-L01-C02-A03-P03.srt';

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <VideoPlayer videoSrc={videoSrc} srtFile={''} />
    </Container>
  );
};

export default P03;
