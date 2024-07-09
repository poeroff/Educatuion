import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구와 함께 하고 싶은 여가 활동이 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L12/C04/A02/EE4-L12-C04-A02-P01.png',
    alt: `두 명의 남자 아이가 자전거를 타면서 환하게 웃고 있다.`,
    title: `두 명의 남자 아이가 자전거를 타면서 환하게 웃고 있다.`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
