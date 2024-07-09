import { Box, IQuestionProps, SvgIcon, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        배운 내용을 다시 한 번 살펴볼까요?
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'404px'}>
        <VideoPlayer videoSrc='/B01/0004/40/EM311_4_기초(영상).mp4' srtFile={'/B01/0004/40/EM311_4_기초(영상).srt'} />
      </Box>
    </Container>
  );
};

export default P01;
