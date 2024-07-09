import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'View',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '다른 나라 친구들은 어떤 운동을 할까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/LK2/C02/A02/EE4-LK2-C02-A02-P01.jpg',
    alt: `네 개의 운동하는 장면, 아이들이 티볼을 하는 장면, 아이들이 플로어볼을 하는 장면, 아이들이 플라잉디스크를 하는 장면, 아이들이 추크볼을 하는 장면`,
    title: `네 개의 운동하는 장면, 아이들이 티볼을 하는 장면, 아이들이 플로어볼을 하는 장면, 아이들이 플라잉디스크를 하는 장면, 아이들이 추크볼을 하는 장면`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
