import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';
import { IMainTitleHeaderProps } from '@maidt-cntn/ui';

const P01 = () => {
  const title = '다음 시간에 배울 내용';

  const goal: IGoal = {
    text: '1. 나눗셈식을 알아봐요(1)',
    isBold: true,
  };

  const material = '바둑돌';

  return <EM01201 mainTitleHeaderInfo={{} as IMainTitleHeaderProps} title={title} goal={goal} material={material} />;
};

export default P01;
