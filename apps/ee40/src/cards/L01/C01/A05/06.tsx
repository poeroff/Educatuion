import { getCorrectData, getDefaultData } from './pageData';
import EE40L01C01A05P01 from '@/Pages/EEL01C01A05P01';

const layout = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text' as const,
  },
  questionInfo: {
    text: '엘라의 기분이 어땠나요?',
  },
};

const imgArr = [
  {
    src: '/L01/C01/A05/EE4-L01-C01-A05-P01.jpg',
    alt: '교실에서 아이들이 인사를 나누고 있고, 수호와 엘라도 웃으며 서로에게 인사하고 있는 모습',
    title: '교실에서 아이들이 인사를 나누고 있고, 수호와 엘라도 웃으며 서로에게 인사하고 있는 모습',
  },
];

const pageData = {
  pageNumber: 6,
  mainKey: 6,
  subKey: 'TEXT-01',
  getDefaultData: getDefaultData,
  getCorrectData: getCorrectData,
};

const P06 = () => {
  return <EE40L01C01A05P01 layout={layout} imgArr={imgArr} pageData={pageData} />;
};

export default P06;
