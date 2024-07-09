import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구들은 무슨 행사에 참여했나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L10/C01/A05/EE4-L10-C01-A05-P01-01.jpg',
    // src: '/L10/C01/A05/EE4-L10-C01-A05-P01-02.jpg',
    alt: `운동장에서 남자아이와 여자아이가 서로 어깨동무를 하며 달리고 있고, 친구들이 그 아이들을 응원하고 있는 모습`,
    title: `운동장에서 남자아이와 여자아이가 서로 어깨동무를 하며 달리고 있고, 친구들이 그 아이들을 응원하고 있는 모습`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
