//Page: EE4-L08-C02-A07-P03

import EEL04C02A08P03 from '@/Pages/EEL04C02A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 2_Try It' },
  questionInfo: { text: '스케이트장에서 지켜야 할 규칙을 우리말로 적고, 그 규칙을 영어로 말해 봅시다.' },
};

const P03 = () => {
  return (
    <EEL04C02A08P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData
      }}
      contentInfo={'사고 싶은 물건'}
    ></EEL04C02A08P03>
  );
};

export default P03;
