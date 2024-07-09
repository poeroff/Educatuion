import { Box, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../../../assets/icon/m_default_01.svg';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: undefined,
    iconType: undefined,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        만화를 보며 이번 단원에서 배운 내용을 확인해 보세요 .
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'394px'}>
        <VideoPlayer videoSrc={'/B01/0011/03/(추가) EM311_M_만화로마무리2.mp4'} srtFile={'/B01/0011/03/(추가) EM311_M_만화로마무리2.srt'} />
      </Box>
    </Container>
  );
};

export default P01;
