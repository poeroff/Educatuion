import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01101 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: "Listen to Hajun's presentation.",
  };

  const data = (
    <>
      Hello, I’m{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Hajun.
      </Typography>{' '}
      It’s a great honor to speak as a representative of the 1st grade students. As a newcomer myself, I understand how everybody is feeling at the
      moment. We might feel a bit worried about{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        making new friends or performing well in class.
      </Typography>{' '}
      Instead of focusing on those worries, let’s try a few things together. First,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        let’s join clubs to make new friends.
      </Typography>{' '}
      Second,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        seek advice from seniors and teachers for support.
      </Typography>{' '}
      I hope we all can{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        accomplish our goals and enjoy high school life.
      </Typography>{' '}
      <br />
      <br />
      Hello, I’m{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        Hajun.
      </Typography>{' '}
      It’s a great honor to speak as a representative of the 1st grade students. As a newcomer myself, I understand how everybody is feeling at the
      moment. We might feel a bit worried about{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        making new friends or performing well in class.
      </Typography>{' '}
      Instead of focusing on those worries, let’s try a few things together. First,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        let’s join clubs to make new friends.
      </Typography>{' '}
      Second,{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        seek advice from seniors and teachers for support.
      </Typography>{' '}
      I hope we all can{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        accomplish our goals and enjoy high school life.
      </Typography>{' '}
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background={'white'} useRound useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default HE01101;
