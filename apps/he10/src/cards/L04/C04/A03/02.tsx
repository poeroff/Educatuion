import { Box, TMainHeaderInfoTypes, Typography, Scroll, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: 'Listen to the lecture.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A03/HE1-L04-C04-A03.mp3',
  };

  const data = (
    <>
      We’ve been worried about environmental problems for years, but today, I have some good news to share! According to
      <Typography useGap={false} textDecoration={'underline'}>
        auto market research,
      </Typography>
      <Typography useGap={false} textDecoration={'underline'}>
        sales of electric cars are on the rise.
      </Typography>{' '}
      This is a positive sign for our environment because it means that
      <Typography useGap={false} textDecoration={'underline'}>
        harmful gases emitted by gasoline-powered cars are being reduced.
      </Typography>{' '}
      If this trend continues, it’ll{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        help reduce global warming significantly
      </Typography>{' '}
      in the future. Why don’t you make a small effort for the environment, too? A brighter future will be within our reach.{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        For ABS News,
      </Typography>{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        I’m Sihu Kim.
      </Typography>
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
