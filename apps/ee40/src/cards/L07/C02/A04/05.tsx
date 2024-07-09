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
    src: '/L07/C02/A04/EE4-L07-C02-A04-P05.jpg',
    alt: `8시 30분을 가리키는 시계, 토스트, 샐러드, 그리고 우유가 놓여 있는 식탁, 남자아이와 그 아이의 엄마가 마주 보고 서 있는 모습`,
    title: `8시 30분을 가리키는 시계, 토스트, 샐러드, 그리고 우유가 놓여 있는 식탁, 남자아이와 그 아이의 엄마가 마주 보고 서 있는 모습`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
