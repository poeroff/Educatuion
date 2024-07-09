import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '해결하는 수학',
    pattern: 'text',
  };

  const title = '이번 시간에 배울 내용';

  const goal: IGoal = {
    text: '해결하는 수학',
    isBold: true,
  };

  const subGoal: IGoal = {
    text: '해열제 안전하게 먹기',
  };

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} subGoal={subGoal} title={title} />;
};

export default P01;
