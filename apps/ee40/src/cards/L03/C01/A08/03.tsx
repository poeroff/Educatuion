import EEL08C01A08P03 from '@/Pages/EEL08C01A08P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const layout = {
  headerInfo: { headerText: 'Mission 1_Try It' },
  questionInfo: { text: '친구의 휴대 전화 사진을 보며 누구인지 묻고 답해 봅시다.' },
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
      contentInfo={['누구인지 묻는 말', '누구인지 묻는 말에 답하는 말']}
    ></EEL08C01A08P03>
  );
};

export default P03;
