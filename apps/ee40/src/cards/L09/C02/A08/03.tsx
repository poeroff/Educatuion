import EEL05C02A08P03 from '@/Pages/EEL05C02A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '친구나 선생님에게 물건의 위치를 묻는 말을 하고, 친구나 선생님의 질문에는 모른다고 답해 봅시다.' },
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
      contentInfo={['물건의 위치를 묻는 말', '모른다고 답하는 말']}
    ></EEL05C02A08P03>
  );
};

export default P03;
