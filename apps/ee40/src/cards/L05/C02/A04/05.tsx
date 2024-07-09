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
    src: '/L05/C02/A04/EE4-L05-C02-A04-P05.JPG',
    alt: `야외에서 야구복과 야구 모자를 쓴 남자아이와 실내에서 쉬고 있는 여자아이가 통화를 하는 모습`,
    title: `야외에서 야구복과 야구 모자를 쓴 남자아이와 실내에서 쉬고 있는 여자아이가 통화를 하는 모습`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
