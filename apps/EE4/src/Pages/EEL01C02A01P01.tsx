import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Typography, TMainHeaderInfoTypes, Label } from '@maidt-cntn/ui';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  question: string[];
}

const EEL01C02A01P01 = (props: Props) => {
  return (
    <Container headerInfo={props.headerInfo}>
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <List
            data={props.question}
            row={({ value }) => (
              <Box hAlign={'start'} vAlign={'center'}>
                <Label background='#FFB400' type='paint' size='xx-small' />
                <Typography weight={500}>{value}</Typography>
              </Box>
            )}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL01C02A01P01;
