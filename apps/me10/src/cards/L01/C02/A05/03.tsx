import { Box, IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndChoose',
  };

  const questionInfo: IQuestionProps = {
    text: '영상을 보며 대화 내용을 다시 한번 확인해 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box height={'90%'}>
        <VideoPlayer videoSrc='/L01/C02/A05/ME1-L01-C02-A05-P03.mp4' srtFile={'/L01/C02/A05/ME1-L01-C02-A05-P03.srt'} />
      </Box>
    </Container>
  );
};

export default P03;
