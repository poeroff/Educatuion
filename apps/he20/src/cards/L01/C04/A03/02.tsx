import { Box, TMainHeaderInfoTypes, Typography, Scroll, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: 'Listen to the presentation.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A03/HE2-L01-C04-A03.mp3',
  };

  const data = (
    <Typography usePre>
      Hello, everyone! Are you thinking of adopting a{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Welsh Corgi
      </Typography>
      ? Today, I’d like to share some tips for raising this special companion.
      {'\n'} First of all,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Welsh Corgis are highly active,
      </Typography>{' '}
      so it’s important to{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        play with them a lot to keep them happy.
      </Typography>
      {'\n'}
      Secondly,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        be careful when walking them on the hot summer days,
      </Typography>{' '}
      as{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        they are sensitive to the heat from the ground because of their short legs.
      </Typography>
      {'\n'} Lastly,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        pay close attention to their food consumption
      </Typography>{' '}
      since{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        they tend to gain weight easily.
      </Typography>{' '}
      Remember these tips and take good care of your animals!
    </Typography>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' audioInfo={audioInfo}>
      <Box background={'white'} height='350px' overflow='auto' useRound useFull>
        <Scroll>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P02;
