import { Box, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes | null = {
    headerText: 'Listening Strategy',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };
  const description =
    'While listening, pay close attention to the speaker’s tone of voice. This will help you infer their intended meaning and emotion.';
  const title = 'Analyzing Tone';

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center'>
        <Box flexDirection='column' width='840px' height='280px' padding='28px' hAlign={'center'} background='white' useRound useShadow>
          <Box padding='8px 12px'>
            <Typography weight={'var(--font-weight-bold)'}>{title}</Typography>
          </Box>
          <Box padding='8px'>
            <Typography weight={'var(--font-weight-medium)'} useGap={false}>
              {description}{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
