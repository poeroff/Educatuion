import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '‘신데렐라’와 비슷한 우리나라 전래 동화는 무엇인가요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L10/C04/A02/EE4-L10-C04-A02-P01.jpg',
    alt: `마법처럼 보이는 효과를 가진 책이 펼쳐져 있다. 책에서 빛과 별 모양의 반짝이는 불꽃들이 솟아오르고 있다.`,
    title: `마법처럼 보이는 효과를 가진 책이 펼쳐져 있다. 책에서 빛과 별 모양의 반짝이는 불꽃들이 솟아오르고 있다.`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
