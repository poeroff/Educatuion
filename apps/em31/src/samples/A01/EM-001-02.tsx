import { Box, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';

const EM00102 = () => {
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
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'404px'}>
        <VideoPlayer videoSrc='' srtFile={''} />
      </Box>
    </Container>
  );
};

export default EM00102;
