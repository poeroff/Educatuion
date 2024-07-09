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
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box height={'404px'}>
        <VideoPlayer videoSrc={'/C02/0006/20/EM312_6_기초(영상).mp4'} srtFile={'/C02/0006/20/EM312_6_기초(영상).srt'} />
      </Box>
    </Container>
  );
};

export default P01;
