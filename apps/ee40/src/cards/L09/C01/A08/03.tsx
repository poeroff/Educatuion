import EEL11C01A09P03 from '@/Pages/EEL11C01A09P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '책의 위치를 짝과 묻고 답해 봅시다.' },
};

const P03 = () => {
  return (
    <EEL11C01A09P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={['책의 위치를 묻는 말', '책의 위치를 묻는 말에  답하는 말']}
    ></EEL11C01A09P03>
  );
};

export default P03;
