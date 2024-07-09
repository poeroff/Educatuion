import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '잭의 가족은 무엇을 하고 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L09/C01/A05/EE4-L09-C01-A05-P01-01.jpg',
    // src: '/L09/C01/A05/EE4-L09-C01-A05-P01-02.jpg',
    alt: '남자아이(잭)와 그의 부모님이 집에서 물건들을 찾고 있는 모습',
    title: '남자아이(잭)와 그의 부모님이 집에서 물건들을 찾고 있는 모습',
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
