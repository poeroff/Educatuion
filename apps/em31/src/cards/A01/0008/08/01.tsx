import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '함께하는 수학',
    pattern: 'text',
  };

  const title = '다음 시간에 배울 내용';

  const goal: IGoal = {
    text: '함께하는 수학',
    isBold: true,
  };

  const material = '색연필';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} title={title} material={material} />;
};

export default P01;
