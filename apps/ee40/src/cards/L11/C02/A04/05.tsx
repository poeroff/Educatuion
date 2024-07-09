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
    src: '/L11/C02/A04/EE4-L11-C02-A04-P05.jpg',
    alt: `그림을 그리는 캐릭터가 새겨진 가방을 들고 있는 남자아이와 로봇 그림이 새겨진 가방을 들고 있는 여자아이`,
    title: `그림을 그리는 캐릭터가 새겨진 가방을 들고 있는 남자아이와 로봇 그림이 새겨진 가방을 들고 있는 여자아이`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
