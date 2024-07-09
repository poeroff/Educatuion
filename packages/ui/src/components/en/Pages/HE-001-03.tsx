import { BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import CircleArrow from '@maidt-cntn/assets/icons/circle_arrow.svg';

export interface IHE01103 {
  goals: string[];
}

const HE01103 = ({ goals }: IHE01103) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '학습 목표',
  };

  const data = goals.map(text => ({ text }));

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <List<{ text: string }>
            data={data}
            gap={20}
            row={({ value, index = 1 }) => (
              <Box key={index} vAlign='flex-start'>
                <SvgIcon src={CircleArrow} size='22px' style={{ marginTop: '12px', marginRight: '8px' }} />
                <Typography weight='var(--font-weight-bold)'>{value?.text}</Typography>
              </Box>
            )}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE01103;
