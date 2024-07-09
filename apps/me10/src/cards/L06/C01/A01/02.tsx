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
        <Typography useGap={false}>Who Do I Want to Be?</Typography>
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
                I
                <Typography weight='var(--font-weight-bold)' useGap={true}>
                  want to be
                </Typography>
                a robot designer.
              </Typography>
            </BoxWrap>
            <BoxWrap>
              <Typography>
                What do you want to be
                <Typography weight='var(--font-weight-bold)' useGap={true}>
                  when
                </Typography>
                you grow up?
              </Typography>
            </BoxWrap>
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default P02;
