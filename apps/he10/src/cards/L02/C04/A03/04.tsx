import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Speaking Strategy',
    headerPattern: 'text',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center'>
        <Box flexDirection='column' width='840px' height='280px' padding='28px' hAlign={'center'} background='white' useRound useShadow>
          <Box padding='8px 12px'>
            <Typography weight='700' color='var(--color-blue-600)'>
              Using Cue Cards
            </Typography>
          </Box>
          <Box padding='8px'>
            <Typography weight='500' useGap={false}>
              Use cue cards with keywords during your presentation. This will help you remember the content and flow of your presentation.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
