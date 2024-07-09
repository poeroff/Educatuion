import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: 'Listen to the advertisement.',
  };

  const audioInfo = {
    audioSrc: '/L02/C04/A03/HE2-L02-C04-A03.mp3',
    captionSrc: '/L02/C04/A03/HE2-L02-C04-A03.srt',
  };

  const data = (
    <>
      <Typography style={{ display: 'inline' }}>
        Welcome to our live show on social media! Today, I’d like to show you one of our top-selling items:
      </Typography>
      <Typography useGap={false} style={{ display: 'inline' }} textDecoration={'underline'}>
        a Bluetooth keyboard
      </Typography>
      <Typography useGap={false} style={{ display: 'inline' }}>
        .{' '}
      </Typography>
      <Typography useGap={false} style={{ display: 'inline' }} textDecoration={'underline'}>
        It has a comfortable, curved design to support your wrists better than others
      </Typography>
      <Typography useGap={false}>. Most of our users are satisfied with this product. </Typography>
      <Typography useGap={false} style={{ display: 'inline' }} textDecoration={'underline'}>
        If you share a photo review on our website, we’ll reward you with a 10% off coupon for your next purchase
      </Typography>
      .
      <br />
      Don’t miss this great opportunity!
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <Box background={'white'} height={350} useRound useFull>
        <Scroll>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P02;
