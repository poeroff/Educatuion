import EEL11C01A09P03 from '@/Pages/EEL11C01A09P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '주말에 무슨 여가 활동을 하는지 친구와 묻고 답해 봅시다.' },
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
      contentInfo={['주말에 무슨 여가 활동을 하는지 묻는 말', '주말에 무슨 여가 활동을 하는지 묻는 말에 답하는 말']}
    ></EEL11C01A09P03>
  );
};

export default P03;
