import { Box, Typography } from '@maidt-cntn/ui';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
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
            <Typography weight='800' color='#2284C6'>
              Respecting Others
            </Typography>
          </Box>
          <Box padding='8px'>
            <Typography weight='500' useGap={false}>
              When communicating with others, be respectful and express your opinions in a polite manner. This will make you a pleasant person to talk
              to.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
