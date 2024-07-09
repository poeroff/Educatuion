import EEL05C02A08P03 from '@/Pages/EEL05C02A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '친구에게 운동을 제안하고, 친구의 제안에 적절한 이유를 덧붙여 거절해 봅시다.', },
};

const P03 = () => {
  return (
    <EEL05C02A08P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={['운동을 제안하는 말', '제안에 거절하는 말']}
    ></EEL05C02A08P03>
  );
};

export default P03;