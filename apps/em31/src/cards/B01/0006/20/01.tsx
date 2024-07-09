import { Box, VideoPlayer, SvgIcon, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../../../assets/icon/m_default_01.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        수업에 도움이 되는 영상을 살펴보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'394px'}>
        <VideoPlayer videoSrc='/B01/0006/20/EM311_6_추가영상.mp4' srtFile={''} />
      </Box>
    </Container>
  );
};

export default P01;
