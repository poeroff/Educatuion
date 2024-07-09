import { Container } from '@maidt-cntn/ui/en';
import { Box, VideoPlayer, TMainHeaderInfoTypes, IQuestionProps, BoxWrap } from '@maidt-cntn/ui';

interface IVideoPlayerProps {
  videoSrc: string;
  srtFile: string;
  width?: string;
  height?: string;
}

interface IEEL01C01A04P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  videoInfo: IVideoPlayerProps;
}

const EEL01C01A04P02 = ({ headerInfo, questionInfo, videoInfo }: IEEL01C01A04P02) => {
  return (
    <Container vAlign='top' headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull justifyContent={'center'} alignItems=' center'>
        <Box vAlign={'center'} hAlign={'center'} width={videoInfo.width} height={videoInfo.height}>
          <VideoPlayer srtFile={videoInfo.srtFile} videoSrc={videoInfo.videoSrc} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL01C01A04P02;
