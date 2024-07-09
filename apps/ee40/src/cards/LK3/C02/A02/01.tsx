import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'View',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '다른 나라에는 어떤 시장이 있을까요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/LK3/C02/A02/EE4-LK3-C02-A02-P01.JPG',
    alt: `대한민국 시장에서 떡볶이를 파는 아주머니와 그 앞에서 엽전을 들고 있는 이보와 올리, 카타르 시장에서 카타르 전통 물건과 낙타를 구경하는 올리와 이보, 베트남 시장인 물 위에 떠다니는 배 위에서 물건을 구경하는 올리와 이보, 미국 시장에서 과일을 구경하는 올리와 이보`,
    title: `대한민국 시장에서 떡볶이를 파는 아주머니와 그 앞에서 엽전을 들고 있는 이보와 올리, 카타르 시장에서 카타르 전통 물건과 낙타를 구경하는 올리와 이보, 베트남 시장인 물 위에 떠다니는 배 위에서 물건을 구경하는 올리와 이보, 미국 시장에서 과일을 구경하는 올리와 이보`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
