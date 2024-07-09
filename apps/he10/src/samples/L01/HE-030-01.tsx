import { Box, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE03001 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading Strategy',
    headerPattern: 'text',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center'>
        <Box flexDirection='column' width='840px' height='280px' padding='28px' hAlign={'center'} background='white' useRound useShadow>
          <Box padding='8px 12px'>
            <Typography weight='700'>Finding the Main Idea & Details</Typography>
          </Box>
          <Box padding='8px'>
            <Typography weight='500' useGap={false}>
              Find the main idea by identifying the key concept of a topic and the details that support the main idea.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HE03001;
