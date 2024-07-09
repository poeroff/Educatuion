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
  subKey: 'TEXT-05',
  images: {
    src: '/L06/C02/A04/EE4-L06-C02-A04-P05.jpg',
    alt: `책을 읽고 있는 아이와 그 모습을 바라보며 뒤에 서 있는 두 명의 아이들`,
    title: `책을 읽고 있는 아이와 그 모습을 바라보며 뒤에 서 있는 두 명의 아이들`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
