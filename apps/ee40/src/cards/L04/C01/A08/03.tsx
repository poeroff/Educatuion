import EEL04C01A08P03 from '@/Pages/EEL04C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '수업 시간에 하면 안 되는 행동을 우리말로 적고, 이 행동을 금지하는 말을 해 봅시다.' },
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
      contentInfo={['수업 시간에 하면 안 되는 행동', '그 행동을 금지하는 말']}
    ></EEL04C01A08P03>
  );
};

export default P03;
