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
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L09/C02/A04/EE4-L09-C02-A04-P01.jpg',
    alt: `방 안 침대 위에 가방이 놓여 있는 모습. 그 가방을 손으로 가리키고 있는 아빠와 그 아빠를 마주보고 서 있는 여자아이`,
    title: `방 안 침대 위에 가방이 놓여 있는 모습. 그 가방을 손으로 가리키고 있는 아빠와 그 아빠를 마주보고 서 있는 여자아이`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
