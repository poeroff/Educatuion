//Page: EE4-L02-C02-A07-P03

import EEL06C01A08P03 from '@/Pages/EEL06C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 2_Try It' },
  questionInfo: { text: '인공지능 스피커에게 이름을 물어 보고, 이름을 우리말로 적어 봅시다.' },
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
        getSolutionData,
      }}
      contentInfo={['이름을 묻는 말', '인공지능 스피커의 이름']}
    ></EEL06C01A08P03>
  );
};

export default P03;
