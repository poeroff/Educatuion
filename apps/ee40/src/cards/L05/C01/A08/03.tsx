import EEL05C02A08P03 from '@/Pages/EEL05C02A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '좋아하는 운동을 우리말로 적고, 친구에게 그 운동을 같이 하자고 제안해 봅시다.' },
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
      contentInfo={['제안하는 말', '친구의 제안에 답하는 말']}
    ></EEL05C02A08P03>
  );
};

export default P03;
