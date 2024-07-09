import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '올리는 무엇을 하고 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: ['/L12/C01/A05/EE4-L12-C01-A05-P01.jpg', '/L12/C01/A05/EE4-L12-C01-A05-P02.jpg'],
    alt: `외계인 친구(올리)가 자전거를 타고 있는 여자아이(민지)와 이야기를 나누며 방송하고 있는 모습`,
    title: `외계인 친구(올리)가 자전거를 타고 있는 여자아이(민지)와 이야기를 나누며 방송하고 있는 모습`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
