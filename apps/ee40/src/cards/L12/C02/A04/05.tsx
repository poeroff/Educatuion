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
  mainKey: 5,
  subKey: 'TEXT-01',
  images: {
    src: '/L12/C02/A04/EE4-L12-C02-A04-P05.jpg',
    alt: `복도에서 이야기를 나누고 있는 남자아이와 여자아이, 강아지를 산책시키는 모습이 담긴 여자아이의 말풍선`,
    title: `복도에서 이야기를 나누고 있는 남자아이와 여자아이, 강아지를 산책시키는 모습이 담긴 여자아이의 말풍선`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
