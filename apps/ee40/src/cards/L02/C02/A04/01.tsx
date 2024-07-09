import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '사진 속 인물들이 어떤 대화를 하고 있을까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 0,
  subKey: 'TEXT-01',
  images: {
    src: '/L02/C02/A04/EE4-L02-C02-A04-P01.jpg',
    alt: '남자아이가 여자아이에게 자신의 아빠를 소개하는 모습',
    title: '남자아이가 여자아이에게 자신의 아빠를 소개하는 모습',
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
