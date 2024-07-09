import { Box, SvgIcon, IQuestionProps, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P0301 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        만화를 보며 이 단원에서 배운 내용을 확인해 보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'390px'}>
        <VideoPlayer videoSrc='/A04/0009/03/EM314_M_마무리만화.mp4' srtFile={'/A04/0009/03/EM314_M_마무리만화.srt'} />
      </Box>
    </Container>
  );
};

export default P0301;
