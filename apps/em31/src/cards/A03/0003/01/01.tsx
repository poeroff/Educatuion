import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';
import { IMainTitleHeaderProps } from '@maidt-cntn/ui';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    pattern: 'text',
  };

  const title = '이번 시간에 배울 내용';

  const goal: IGoal = {
    text: '2. 나눗셈식을 알아봐요(2)',
    isBold: true,
  };

  const material = '바둑돌';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} title={title} material={material} />;
};

export default P01;
