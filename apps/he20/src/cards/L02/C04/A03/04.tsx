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
            <Typography weight='700'>Using Visual Aids</Typography>
          </Box>
          <Box padding='8px'>
            <Typography weight='500' useGap={false}>
              When promoting something, create visual aids that highlight key points with appealing images. This will effectively engage your audience
              in a powerful way.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
