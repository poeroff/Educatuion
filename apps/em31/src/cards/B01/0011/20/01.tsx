import { Box, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        수학에 관련된 재미있는 이야기를 더 알아보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'394px'}>
        <VideoPlayer videoSrc='/B01/0011/20/(추가) EM311_M_수학더알기.mp4' srtFile={'/B01/0011/20/(추가) EM311_M_수학더알기.srt'} />
      </Box>
    </Container>
  );
};

export default P01;
