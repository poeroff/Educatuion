import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '엘라의 아빠는 무엇을 하고 계신가요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L06/C01/A05/EE4-L06-C01-A05-P01-01.jpg',
    // src: '/L06/C01/A05/EE4-L06-C01-A05-P01-02.jpg',
    alt: `여자아이(엘라)의 아빠가 부엌에서 요리를 하고 있고, 엘라와 남동생이 옆에서 보고 모습`,
    title: `여자아이(엘라)의 아빠가 부엌에서 요리를 하고 있고, 엘라와 남동생이 옆에서 보고 모습`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
