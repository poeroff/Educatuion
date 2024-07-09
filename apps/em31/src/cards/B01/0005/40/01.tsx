import { Box, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        배운 내용을 다시 한 번 살펴볼까요 ?
      </>
    ),
  };
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'394px'}>
        <VideoPlayer videoSrc='/C01/0005/20/EM311_5_기초(영상).mp4' srtFile={'/C01/0005/20/EM311_5_기초(영상).srt'} />
      </Box>
    </Container>
  );
};

export default P01;
