import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구들은 어디에 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L05/C01/A05/EE4-L05-C01-A05-P01-01.jpg',
    // src: '/L05/C01/A05/EE4-L05-C01-A05-P01-02.jpg',
    alt: `여자아이(엘라)와 남자아이(앤디), 그리고 올리가 캠핑장의 축구장에 있는 모습`,
    title: `여자아이(엘라)와 남자아이(앤디), 그리고 올리가 캠핑장의 축구장에 있는 모습`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
