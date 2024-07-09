import { Box, BoxWrap, IAudioPlayerProps, IQuestionProps, Label, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IInterview {
  type: string;
  content: React.ReactNode;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: 'Listen to the interview.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A03/HE1-L02-C04-A03.mp3',
    right: 10,
    top: 10,
  };

  const data: IInterview[] = [
    {
      type: 'A',
      content: (
        <Typography useGap={false} usePre>
          Welcome to Everybook Show! Today, we have &nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            Barbara O’Connor
          </Typography>
          , the author of the best-selling book &nbsp;
          <Typography useGap={false} textDecoration={'underline'} fontStyle={'italic'}>
            How to Steal a Dog.
          </Typography>
          {`\nHi, `}
          <Typography useGap={false} textDecoration={'underline'}>
            Barbara
          </Typography>{' '}
          . Can you tell us a little bit about your book?
        </Typography>
      ),
    },
    {
      type: 'B',
      content: (
        <>
          Thanks for having me.{' '}
          <Typography useGap={false} textDecoration={'underline'} fontStyle={'italic'}>
            How to Steal a Dog
          </Typography>{' '}
          is{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            a fictional story about a girl who tries to steal a dog to get the reward money and support her family.
          </Typography>
        </>
      ),
    },
    {
      type: 'A',
      content: <>That sounds interesting. What message would you like to give to the readers through your book?</>,
    },
    {
      type: 'B',
      content: <>I’d like to tell people to make sure to consider what is right and wrong even in difficult situations.</>,
    },
    {
      type: 'A',
      content: <>That’s definitely a valuable lesson. Thanks for being on our show. We’re looking forward to your next book!</>,
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' audioInfo={audioInfo}>
      <Box background={'white'} height='380px' useRound useFull>
        <Scroll tabIndex={101}>
          <List<IInterview> data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap>
                <Box>
                  <Label
                    value={value?.type || ''}
                    type={'paint'}
                    background={value?.type === 'A' ? 'var(--color-blue-100)' : 'var(--color-yellow-500)'}
                  />
                </Box>
                <Box>
                  <Typography useGap={false}>{value?.content}</Typography>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P02;
