import EEL07C02A07P03 from '@/Pages/EEL07C02A07P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 2_Try It' },
  questionInfo: { text: '지금 몇 시인지 우리말로 적고, 지금이 몇 시고 무엇을 할 시간인지 영어로 말해 봅시다.' },
};

const P03 = () => {
  return (
    <EEL07C02A07P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={['지금 시각', '지금 몇 시고 무엇을 할 시간인지 나타내는 말']}
    ></EEL07C02A07P03>
  );
};

export default P03;
