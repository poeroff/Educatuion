import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '가족과 집안일을 나누어 하나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L09/C04/A02/EE4-L09-C04-A02-P01.jpg',
    alt: `거실에서 청소를 하는 엄마와 딸의 모습. 그들은 노란색 고무장갑을 끼고 하이파이브를 하며 즐겁게 웃고 있다.`,
    title: `거실에서 청소를 하는 엄마와 딸의 모습. 그들은 노란색 고무장갑을 끼고 하이파이브를 하며 즐겁게 웃고 있다.`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
