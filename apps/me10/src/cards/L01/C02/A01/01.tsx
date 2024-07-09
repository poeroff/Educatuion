import { Box, TMainHeaderInfoTypes, List, Typography, SvgIcon, ESvgType, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import CircleArrow from '@maidt-cntn/assets/icons/circle_arrow.svg';

interface ILearingGoal {
  text: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '학습 목표',
  };

  const data: ILearingGoal[] = [
    {
      text: '자기소개를 하고 좋아하는 것을 묻고 답하는 대화를 듣고 이해할 수 있다.',
    },
    {
      text: '자기소개를 하고 좋아하는 것을 묻고 답할 수 있다.',
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

export default P01;
