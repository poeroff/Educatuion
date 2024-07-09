import { Box, ETagLine, ETextViewColor, IMainTitleHeaderProps, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

export interface IEM01201 {
  mainTitleHeaderInfo: IMainTitleHeaderProps;
  title: string;
  titleType?: ETextViewColor;
  goal: IGoal;
  subGoal?: IGoal;
  material?: string;
}

export interface IGoal {
  text: string;
  isBold?: boolean;
  align?: 'left' | 'center' | 'right';
}

const EM01201 = ({ mainTitleHeaderInfo, title, titleType, goal, subGoal, material }: IEM01201) => {
  const alignGoal = () => {
    const align = goal.align ?? 'center';

    if (align === 'left') {
      return 'flex-start';
    } else if (align === 'center') {
      return 'center';
    } else {
      return 'flex-end';
    }
  };

  return (
    <Container headerInfo={mainTitleHeaderInfo} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={titleType ?? ETextViewColor.LIGHT_YELLOW} title={title}>
          <Box
            alignItems={alignGoal()}
            width={'481px'}
            padding='44px 20px 32px 20px'
            display='flex'
            flexDirection='column'
            gap={'10px'}
            borderRadius={8}
          >
            <Typography fontSize={'28px'} weight={goal.isBold ? 'var(--font-weight-bold)' : undefined}>
              {goal.text}
            </Typography>
            {subGoal && (
              <Typography fontSize={'28px'} style={{ marginTop: '10px' }}>
                {subGoal?.text}
              </Typography>
            )}
          </Box>
        </TextView>
      </Box>
      {material && (
        <Box hAlign='end' marginTop='24px' gap={'4px'}>
          <Tag height={'40px'} type={ETagLine.GREEN} label='준비물' />
          <Typography style={{ marginLeft: '10px' }} fontSize={'28px'}>
            {material}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default EM01201;
