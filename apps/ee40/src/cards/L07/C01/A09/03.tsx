//Page: EE4-L07-C01-A09-P03

import EEL06C01A08P03 from '@/Pages/EEL06C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '인공지능 스피커에게 지금 몇 시인지 묻고, 지금 시각을 써 봅시다.' },
};

const P03 = () => {
  return (
    <EEL06C01A08P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData
      }}
      contentInfo={['지금 몇 시인지 묻는 말', '지금 시각']}
    ></EEL06C01A08P03>
  );
};

export default P03;
