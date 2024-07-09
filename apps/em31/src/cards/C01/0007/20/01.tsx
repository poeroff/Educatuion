import { Box, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';

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
        배운 내용을 다시 한 번 살펴볼까요?
      </>
    ),
  };

  const videoSrc = '/C01/0007/20/EM311_7_기초(영상).mp4';
  const srtFile = '/C01/0007/20/EM311_7_기초(영상).srt';

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'364px'}>
        <VideoPlayer videoSrc={videoSrc} srtFile={srtFile} />
      </Box>
    </Container>
  );
};

export default P01;
