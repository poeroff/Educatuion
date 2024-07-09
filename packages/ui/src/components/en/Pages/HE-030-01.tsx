import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IHE03001 {
  headerInfo: TMainHeaderInfoTypes;
  title: string;
  description: string;
}

const HE03001 = ({ headerInfo, title, description }: IHE03001) => {
  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' padding='48px 32px'>
        <Box flexDirection='column' padding='24px 32px' hAlign={'center'} background='white' useRound useShadow>
          <Box padding='8px 12px'>
            <Typography weight='700' color={'var(--color-blue-900)'}>
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography weight='500'>{description}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HE03001;
