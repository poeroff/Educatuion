import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구들은 어디에 갔나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L07/C01/A05/EE4-L07-C01-A05-P01-01.jpg',
    // src: '/L07/C01/A05/EE4-L07-C01-A05-P01-02.jpg',
    alt: `아이들과 어른들이 신라 문화제에서 구경하고 있는 모습`,
    title: `아이들과 어른들이 신라 문화제에서 구경하고 있는 모습`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
