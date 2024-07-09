import { TMainHeaderInfoTypes, BoxWrap, Box, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'In this unit, I will learn...',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box margin='0 0 0 24px'>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Read
        </Typography>
      </Box>
      <Box display='flex' gap='50px' marginTop='36px' width='779px' margin='24px auto 0'>
        <Typography useGap={false}>Then and Now</Typography>
      </Box>
      <Box margin='36px 0 0 24px'>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Language Use
        </Typography>
      </Box>
      <Box display='flex' gap='50px' marginTop='24px' width='779px' margin='24px auto 0'>
        <BoxWrap flexDirection='column'>
          <Box display='flex' flexDirection='column'>
            <BoxWrap>
              <Typography useGap={true}>
                Jihun
                <Typography weight='var(--font-weight-bold)' useGap={true}>
                  is waiting
                </Typography>
                for the bus.
              </Typography>
            </BoxWrap>
            <BoxWrap>
              <Typography>
                <Typography weight='var(--font-weight-bold)' useGap={false}>
                  There are
                </Typography>
                &nbsp; many coins in his pocket.
              </Typography>
            </BoxWrap>
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default P02;
