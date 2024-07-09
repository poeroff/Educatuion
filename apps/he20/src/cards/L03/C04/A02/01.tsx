import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening Strategy',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const title = 'Dealing with Unknown Words';
  const description =
    'When you encounter unfamiliar words while listening, try to look for other clues later on. This will help you infer the meaning of the words in context.';

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' padding='48px 32px'>
        <Box flexDirection='column' padding='24px 32px' hAlign={'center'} background='white' useRound useShadow>
          <Box padding='8px 12px'>
            <Typography weight='var(--font-weight-bold)'>{title}</Typography>
          </Box>
          <Box>
            <Typography>{description}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
