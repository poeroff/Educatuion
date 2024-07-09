import EEL04C01A08P03 from '@/Pages/EEL04C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '교실의 분실물 상자 속 물건의 이름을 우리말로 쓰고, 물건의 주인인지 묻는 말을 해 봅시다.' },
};

const P03 = () => {
  return (
    <EEL04C01A08P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={['분실물 상자 속 물건', '물건의 주인인지 묻는 말']}
    ></EEL04C01A08P03>
  );
};

export default P03;
