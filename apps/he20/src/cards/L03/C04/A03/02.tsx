import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: 'Listen to the video guide.',
  };

  const audioInfo = {
    audioSrc: '/L03/C04/A03/HE2-L03-C04-A03.mp3',
    captionSrc: '/L03/C04/A03/HE2-L03-C04-A03.srt',
  };

  const data = (
    <>
      Welcome to{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Buyeo National Museum
      </Typography>
      . Our museum offers a fascinating exploration of{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Baekje’s rich history and culture
      </Typography>
      . We have a remarkable collection of{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        historically significant objects from Baekje
      </Typography>
      . One of the highlights of our museum is{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Baekje Geumdong Daehyangno
      </Typography>
      . Visitors have said their experience was{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        truly amazing
      </Typography>
      . Before you begin your tour, please remember that you’re not allowed to{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        touch the artworks
      </Typography>
      .<br />
      We wish you an enjoyable and unforgettable time here.
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <Box background={'white'} useRound useFull>
        <Scroll>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P02;
