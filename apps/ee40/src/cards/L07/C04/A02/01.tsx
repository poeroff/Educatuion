import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '옛날에는 어떻게 시각을 알았을까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L07/C04/A02/EE4-L07-C04-A02-P01.eps',
    alt: ` 해시계가 그려져 있다. 주변에는 나무와 집이 있고 하늘에는 해가 떠 있고 햇살이 비추고 있다.`,
    title: ` 해시계가 그려져 있다. 주변에는 나무와 집이 있고 하늘에는 해가 떠 있고 햇살이 비추고 있다.`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
