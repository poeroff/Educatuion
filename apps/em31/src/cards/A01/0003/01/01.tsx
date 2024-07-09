import { IMainTitleHeaderProps } from '@maidt-cntn/ui';
import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const mainTitleHeaderInfo: IMainTitleHeaderProps = {
    title: '2. 세 자리 수의 덧셈을 해요 (2)',
    pattern: 'text',
  };

  const title = '이번 시간에 배울 내용';

  const goal: IGoal = {
    text: '2. 세 자리 수의 덧셈을 해요 (2)',
    isBold: true,
  };

  const subGoal: IGoal = {
    text: '- 받아올림이 한 번 있는 경우',
  };

  const material = '수 모형';

  return <EM01201 mainTitleHeaderInfo={mainTitleHeaderInfo} goal={goal} subGoal={subGoal} title={title} material={material} />;
};

export default P01;
