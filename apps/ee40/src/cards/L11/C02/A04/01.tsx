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
    src: '/L11/C02/A04/EE4-L11-C02-A04-P01.jpg',
    alt: `오늘의 할인 메뉴'라고 적힌 입간판이 놓여 있는 피자 가게 앞에서 이야기를 나누는 여자아이와 남자아이`,
    title: `오늘의 할인 메뉴'라고 적힌 입간판이 놓여 있는 피자 가게 앞에서 이야기를 나누는 여자아이와 남자아이`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
