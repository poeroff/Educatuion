import { IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'Listen More',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: '영상을 보며 대화 내용을 다시 한 번 확인해 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      {/* Todo : srt 파일 경로 추가 /L01/C02/A08/ME1-L01-C02-A08-P04.srt */}
      <VideoPlayer videoSrc={'/L01/C02/A08/ME1-L01-C02-A08-P04.mp4'} srtFile={''} />
    </Container>
  );
};

export default P04;
