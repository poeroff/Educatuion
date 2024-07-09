//Page: EE4-L06-C02-A08-P03

import EEL04C02A08P03 from '@/Pages/EEL04C02A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 2_Try It' },
  questionInfo: { text: '쉬는 시간에 친구가 무엇을 하고 있는지 우리말로 쓰고, 영어로 말해 봅시다.' },
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
      contentInfo={'쉬는 시간에 친구가 하고 있는 것'}
    ></EEL04C02A08P03>
  );
};

export default P03;
