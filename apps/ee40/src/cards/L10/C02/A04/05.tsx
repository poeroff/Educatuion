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
    src: '/L10/C02/A04/EE4-L10-C02-A04-P05.jpg',
    alt: `노란색 스카프를 내밀어 보이고 있는 남자와 양 손을 크게 벌리며 말하고 있는 여자아이`,
    title: `노란색 스카프를 내밀어 보이고 있는 남자와 양 손을 크게 벌리며 말하고 있는 여자아이`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
