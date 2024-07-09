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
    src: '/L07/C02/A04/EE4-L07-C02-A04-P01.jpg',
    alt: `그네를 타고 있는 여자아이와 남자아이, 남자아이가 자신의 손목시계를 보고 있는 모습`,
    title: `그네를 타고 있는 여자아이와 남자아이, 남자아이가 자신의 손목시계를 보고 있는 모습`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
