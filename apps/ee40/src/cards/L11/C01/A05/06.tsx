import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구들은 무슨 요일에 축제에 갔나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 6,
  mainKey: 6,
  subKey: 'TEXT-06',
  images: {
    src: '/L11/C01/A05/EE4-L11-C01-A05-P01-01.jpg',
    // src: '/L11/C01/A05/EE4-L11-C01-A05-P01-02.jpg',
    alt: `친구들이 빛 축제 행사장에서 구경하고 있는 모습`,
    title: `친구들이 빛 축제 행사장에서 구경하고 있는 모습`,
  },
};

const P06 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P06;
