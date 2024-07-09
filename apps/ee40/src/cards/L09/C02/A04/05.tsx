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
    src: '/L09/C02/A04/EE4-L09-C02-A04-P05.jpg',
    alt: `공원에서 이야기를 나누고 있는 아이들. 그 중 야구 글러브를 손에 쥐고 있는 남자아이가 아래를 가리키고 있는 모습.`,
    title: `공원에서 이야기를 나누고 있는 아이들. 그 중 야구 글러브를 손에 쥐고 있는 남자아이가 아래를 가리키고 있는 모습.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
