import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '알뜰 시장에 무슨 물건이 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L08/C01/A05/EE4-L08-C01-A05-P01-01.jpg',
    // src: '/L08/C01/A05/EE4-L08-C01-A05-P01-02.jpg',
    alt: `친구들이 알뜰 시장에서 가방, 장화, 컵, 신발, 자동차, 로봇, 모자, 우산, 시계, 배드민턴 라켓 등을 사고 팔고 있는 모습`,
    title: `친구들이 알뜰 시장에서 가방, 장화, 컵, 신발, 자동차, 로봇, 모자, 우산, 시계, 배드민턴 라켓 등을 사고 팔고 있는 모습`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
