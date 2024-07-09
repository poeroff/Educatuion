// Page: EE4-L01-C02-A03-P01
import { Box, IQuestionProps, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  srtFile: string;
  video: string;
};

const P01 = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, srtFile, video } = pageInfo;

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign={'center'}>
        <Box width={684} height={384}>
          <VideoPlayer srtFile={srtFile} videoSrc={video} />
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
