import EEL08C01A08P03 from '@/Pages/EEL08C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '짝의 학용품 가격을 묻고 답해 봅시다.' },
};

const P03 = () => {
  return (
    <EEL08C01A08P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={['가격을 묻는 말', '가격을 묻는 말에 답하는 말']}
    ></EEL08C01A08P03>
  );
};

export default P03;
