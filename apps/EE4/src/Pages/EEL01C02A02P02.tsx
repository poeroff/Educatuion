import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, VideoPlayer, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  isFile: {
    video: string;
    srt: string;
    srtErr: string;
    haveSrt?: boolean;
  };
}

const EEL01C02A02P02 = (props: Props) => {
  const CONST: Props = {
    headerInfo: props.headerInfo,
    questionInfo: props.questionInfo,
    isFile: {
      video: props.isFile.video,
      srt: props.isFile.srt,
      haveSrt: props.isFile.haveSrt,
      srtErr: `1
      00:00:00,000 --> 00:00:30,000
      Not srt file..
      `,
    },
  };

  return (
    <Container headerInfo={CONST.headerInfo} questionInfo={CONST.questionInfo}>
      <BoxWrap useFull>
        <Box hAlign={'center'} vAlign={'center'} useFull>
          <Box width={654} height={326}>
            <VideoPlayer videoSrc={CONST.isFile.video} srtFile={CONST.isFile.haveSrt ? CONST.isFile.srt : CONST.isFile.srtErr} />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL01C02A02P02;
