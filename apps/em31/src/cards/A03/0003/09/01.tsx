import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';
import { IMainTitleHeaderProps } from '@maidt-cntn/ui';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    pattern: 'text',
  };

  const title = '다음 시간에 배울 내용';

  const goal: IGoal = {
    text: '3. 곱셉과 나눗셈의 관계를 알아봐요',
    isBold: true,
  };

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} title={title} />;
};

export default P01;
