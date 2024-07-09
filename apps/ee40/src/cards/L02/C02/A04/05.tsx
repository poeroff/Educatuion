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
  pageNumber: 5,
  mainKey: 0,
  subKey: 'TEXT-05',
  images: {
    src: '/L02/C02/A04/EE4-L02-C02-A04-P05.jpg',
    alt: '간호사와 학생이 서로 마주보고 있는 모습',
    title: '간호사와 학생이 서로 마주보고 있는 모습',
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
