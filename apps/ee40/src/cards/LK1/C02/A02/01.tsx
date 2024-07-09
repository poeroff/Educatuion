import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'View',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '다른 나라 친구들은 이름을 어떻게 지을까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/LK1/C02/A02/EE4-LK1-C02-A02-P01.jpg',
    alt: `대한민국에서 이보, 올리와 인사하는 김수현이라는 이름표를 단 여자아이, 영국에서 이보, 올리와 인사하는 남자아이, 스페인에서 이보와 이야기를 나누고 있는 여자아이, 사우디아라비아에서 올리와 인사하고 있는 남자아이`,
    title: `대한민국에서 이보, 올리와 인사하는 김수현이라는 이름표를 단 여자아이, 영국에서 이보, 올리와 인사하는 남자아이, 스페인에서 이보와 이야기를 나누고 있는 여자아이, 사우디아라비아에서 올리와 인사하고 있는 남자아이`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
