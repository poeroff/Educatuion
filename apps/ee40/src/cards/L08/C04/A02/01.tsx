import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '옛날에는 어떻게 세계여행을 했을까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L08/C04/A02/EE4-L08-C04-A02-P01.eps',
    alt: `세계 지도가 펼쳐져 있고 공중에 비행기 모형이 하늘을 날고 있는 사진`,
    title: `세계 지도가 펼쳐져 있고 공중에 비행기 모형이 하늘을 날고 있는 사진`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
