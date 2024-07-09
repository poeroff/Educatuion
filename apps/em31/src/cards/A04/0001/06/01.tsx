import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '단원 도입',
    pattern: 'text',
  };

  const title = '다음 시간에 배울 내용';

  const goal: IGoal = {
    text: `1.(두 자리 수)×(한 자리 수)를 계산해요(1)`,
    isBold: true,
  };

  const material = '수 모형';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} title={title} material={material} />;
};

export default P01;
