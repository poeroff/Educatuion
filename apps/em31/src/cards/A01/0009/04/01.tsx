import EM01201, { IGoal } from '@maidt-cntn/math/pages/EM-012-01';
import { ETextViewColor, IMainTitleHeaderProps } from '@maidt-cntn/ui';

const P01 = () => {
  const header: IMainTitleHeaderProps = {
    title: '함께하는 수학',
    pattern: 'text',
    titleColor: ETextViewColor.LIGHT_YELLOW,
  };

  const title = '다음 시간에 배울 내용';
  const titleType = ETextViewColor.LIGHT_YELLOW;

  const goal: IGoal = {
    text: '해결하는 수학',
    isBold: true,
  };

  return <EM01201 mainTitleHeaderInfo={header} title={title} titleType={titleType} goal={goal} />;
};

export default P01;
