import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '2. 세 자리 수의 덧셈을 해요(2)',
    pattern: 'text',
  };

  const title = '다음 시간에 배울 내용';

  const goal: IGoal = {
    text: '3. 세 자리수의 덧셈을 해요(3)',
    isBold: true,
  };

  const material = '수 모형';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} title={title} material={material} />;
};

export default P01;
