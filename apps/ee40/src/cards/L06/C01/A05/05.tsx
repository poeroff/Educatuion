import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '엘라는 아빠를 도와 무엇을 했나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L06/C01/A05/EE4-L06-C01-A05-P01-01.jpg',
    // src: '/L06/C01/A05/EE4-L06-C01-A05-P01-02.jpg',
    alt: `여자아이(엘라)의 아빠가 부엌에서 요리를 하고 있고, 엘라와 남동생이 옆에서 보고 모습`,
    title: `여자아이(엘라)의 아빠가 부엌에서 요리를 하고 있고, 엘라와 남동생이 옆에서 보고 모습`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
