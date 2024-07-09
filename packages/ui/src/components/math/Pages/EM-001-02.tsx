import { Box, IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

export interface IEM00102 {
  headerInfo: TMainHeaderInfoTypes | null;
  questionInfo: IQuestionProps;
  videoSrc: string;
  srtFile?: string;
}

const EM00102 = ({ headerInfo, questionInfo, videoSrc, srtFile = '' }: IEM00102) => {
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'404px'}>
        <VideoPlayer videoSrc={videoSrc} srtFile={srtFile} />
      </Box>
    </Container>
  );
};

export default EM00102;
