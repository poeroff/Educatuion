import EEL01C02A08P03 from '@/Pages/EEL01C02A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 2_Try It' },
  questionInfo: { text: '하교하는 시간을 우리말로 적고, 하굣길에 만난 친구와 인사해 봅시다.' },
};

const P03 = () => {
  return (
    <EEL01C02A08P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={['하교하는 시간', '인사하는 말']}
    ></EEL01C02A08P03>
  );
};

export default P03;
