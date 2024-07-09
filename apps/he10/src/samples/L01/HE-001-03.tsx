import { Box, TMainHeaderInfoTypes, List, Typography, SvgIcon, ESvgType, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import CircleArrow from '@maidt-cntn/assets/icons/circle_arrow.svg';

interface ILearingGoal {
  text: string;
}

const HE00103 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '학습 목표',
  };

  const data: ILearingGoal[] = [
    {
      text: '희망 표현하기 표현을 듣고 이해할 수 있다.',
    },
    {
      text: '공감 표현하기 표현을 듣고 이해할 수 있다.',
    },
    {
      text: '희망 표현하기 표현을 듣고 활용하여 대화할 수 있다.',
    },
    {
      text: '공감 표현하기 표현을 듣고 활용하여 대화할 수 있다.',
    },
  ];
  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign={'center'} useFull>
        <List<ILearingGoal>
          data={data}
          gap={24}
          row={({ value }) => (
            <BoxWrap>
              <Box marginRight='8px' hAlign='center'>
                <SvgIcon src={CircleArrow} type={ESvgType.IMG_BG} size='22px' />
              </Box>
              <Typography weight={700} color='var(--color-grey-900)'>
                {value?.text}
              </Typography>
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default HE00103;
