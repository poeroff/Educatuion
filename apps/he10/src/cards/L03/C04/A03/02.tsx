import { Box, IAudioPlayerProps, IQuestionProps, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Listen to the lecture.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C04/A03/HE1-L03-C04-A03.mp3',
  };

  const script = `Hello, students! Today, I’d like to talk about the concept of hexagonal structures.\n
    Have you heard of it before? It’s inspired by the hexagonal shape found in beehives.\n
    The structure is strong and resistant to weight because hexagonally shaped cells are tightly connected. You may wonder how we can apply this principle to our lives. As one example, we can use it in the construction industry. It can also be used in many other products, like wrapping paper. Thank you for listening.`;

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' audioInfo={audioInfo}>
      <Box background={'white'} height='380px' useRound useFull>
        <Scroll tabIndex={0}>
          <Typography useGap={false} usePre>
            {script}
          </Typography>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P02;
