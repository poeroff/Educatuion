import { getCorrectData, getDefaultData } from './pageData';
import EE40L01C01A05P01 from '@/Pages/EEL01C01A05P01';

const layout = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text' as const,
  },
  questionInfo: {
    text: '수영장에 무슨 표지판이 보이나요?',
  },
};

const imgArr = [
  {
    src: ['/L04/C01/A05/EE4-L04-C01-A05-P01-01.jpg', '/L04/C01/A05/EE4-L04-C01-A05-P01-02.jpg'],
    alt: ' 뛰기 금지 표지판이 걸려 있는 수영장에서 한 남자아이가 뛰고, 선생님이 그 아이에게 뛰지 말라고 손짓하는 모습',
    title: ' 뛰기 금지 표지판이 걸려 있는 수영장에서 한 남자아이가 뛰고, 선생님이 그 아이에게 뛰지 말라고 손짓하는 모습',
  },
];

const pageData = {
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  getDefaultData: getDefaultData,
  getCorrectData: getCorrectData,
};

const P01 = () => {
  return <EE40L01C01A05P01 layout={layout} imgArr={imgArr} pageData={pageData} />;
};

export default P01;
