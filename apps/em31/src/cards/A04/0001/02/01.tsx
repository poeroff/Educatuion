import { Box, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '단원 도입 영상',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        만화를 보며 이 단원에서 배우는 내용을 살펴보세요.
      </>
    ),
  };

  const videoSrc = '/A04/0001/02/EM314_0_도입만화.mp4';
  const srtFile = '/A04/0001/02/EM314_0_도입만화.srt';

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'364px'}>
        <VideoPlayer videoSrc={videoSrc} srtFile={srtFile} />
      </Box>
    </Container>
  );
};

export default P01;
