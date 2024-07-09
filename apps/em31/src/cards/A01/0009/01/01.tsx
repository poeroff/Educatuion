import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '함께하는 수학',
    pattern: 'text',
  };

  const title = '이번 시간에 배울 내용';

  const goal: IGoal = {
    text: '함께하는 수학',
    isBold: true,
  };

  const subGoal: IGoal = {
    text: '그림 조각 맞추기',
    isBold: false,
  };

  const material = '색연필';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} subGoal={subGoal} title={title} material={material} />;
};

export default P01;
