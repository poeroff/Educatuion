//Page: EE4-L06-C01-A08-P03

import EEL06C01A08P03 from '@/Pages/EEL06C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 2_Try It' },
  questionInfo: { text: '친구에게 전화해서 무엇을 하고 있는지 묻고, 그 대답을 우리말로 적어 봅시다.' },
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
      contentInfo={['무엇을 하고 있는지 묻는 말', '친구의 대답']}
    ></EEL06C01A08P03>
  );
};

export default P03;
