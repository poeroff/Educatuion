import { Box, ETagLine, ETextViewColor, IMainTitleHeaderProps, Tag, TextView, Typography } from '@maidt-cntn/ui';
import { IGoal } from '@maidt-cntn/math/pages/EM-012-01';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '4. 곱셈',
    pattern: 'text',
  };

  const title = '이번 시간에 배울 내용';

  const goal: IGoal = {
    text: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
    isBold: true,
  };

  const subGoal: IGoal = {
    text: '- 일의 자리에서 올림이 있는 (몇십몇)×(몇)',
  };

  const material = '수 모형';

  return (
    <Container headerInfo={mainTitleHeaderInfo} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='184px' type={ETextViewColor.LIGHT_YELLOW} title={title}>
          <Box width={'581px'} padding='44px 20px 32px 20px' display='flex' flexDirection='column' gap={'10px'} borderRadius={8}>
            <Typography fontSize={'28px'} weight={goal.isBold ? 'var(--font-weight-bold)' : undefined}>
              {goal.text}
            </Typography>
            {subGoal && <Typography fontSize={'28px'}>{subGoal?.text}</Typography>}
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

export default P01;
