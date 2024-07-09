import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'View',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '다른 나라 친구들의 기념일로는 무엇이 있을까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/LK4/C02/A02/EE4-LK4-C02-A02-P01.JPG',
    alt: `미국에서 새싹에 물을 주고 있는 이보, 올리, 그리고 여자아이, 프랑스에서 어머니에게 꽃과 스카프 선물을 드리는 남자아이와 옆에서 축하하고 있는 이보와 올리, 태국에서 놀이공원에서 놀고 있는 여자아이와 아빠, 그리고 그 여자아이의 신발을 찾아주고 있는 이보와 올리`,
    title: `미국에서 새싹에 물을 주고 있는 이보, 올리, 그리고 여자아이, 프랑스에서 어머니에게 꽃과 스카프 선물을 드리는 남자아이와 옆에서 축하하고 있는 이보와 올리, 태국에서 놀이공원에서 놀고 있는 여자아이와 아빠, 그리고 그 여자아이의 신발을 찾아주고 있는 이보와 올리`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
