import { Container } from '@maidt-cntn/ui/math';
import { Box, IQuestionProps, Label, VideoPlayer } from '@maidt-cntn/ui';

const EM00103 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        활동 방법을 알아보세요.
      </>
    ),
  };
  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box height='438px'>
        <VideoPlayer videoSrc='' srtFile={''} />
      </Box>
    </Container>
  );
};

export default EM00103;
