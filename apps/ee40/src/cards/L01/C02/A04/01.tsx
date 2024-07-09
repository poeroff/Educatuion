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
    src: '/L01/C02/A04/EE4-L01-C02-A04-P01.JPG',
    alt: '남자 선생님과 여자 아이가 서로 마주 보며 웃고 있는 사진',
    title: '남자 선생님과 여자 아이가 서로 마주 보며 웃고 있는 사진',
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
