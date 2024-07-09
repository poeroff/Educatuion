import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '단원 도입',
    pattern: 'text',
  };

  const title = '이번 시간에 배울 내용';

  const goal: IGoal = {
    text: `3. 길이를 어림해요`,
    isBold: true,
  };

  const material = '자';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} title={title} material={material} />;
};

export default P01;
