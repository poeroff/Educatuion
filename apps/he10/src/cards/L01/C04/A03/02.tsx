import { Box, TMainHeaderInfoTypes, Typography, Scroll, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: "Listen to Hajun's presentation.",
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A03/HE1-L01-C04-A03.mp3',
    captionSrc: '/L01/C04/A03/HE1-L01-C04-A03.srt',
  };

  const data = (
    <>
      Hello, I’m
      <Typography textDecoration={'underline'}>Hajun.</Typography>
      It’s a great honor to speak as a representative of the 1st grade students. As a newcomer myself, I understand how everybody is feeling at the
      moment. We might feel a bit worried about
      <Typography textDecoration={'underline'}>making new friends or performing well in class.</Typography>
      Instead of focusing on those worries, let’s try a few things together. First,
      <Typography textDecoration={'underline'}>let’s join clubs to make new friends.</Typography>
      Second,
      <Typography textDecoration={'underline'}>seek advice from seniors and teachers for support.</Typography>I hope we all can
      <Typography textDecoration={'underline'}>accomplish our goals and enjoy high school life.</Typography>
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' audioInfo={audioInfo}>
      <Box background={'white'} height='350px' useRound useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P02;
