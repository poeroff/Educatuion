import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '내가 탐정이라면 어떤 문제를 해결하고 싶나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L06/C04/A02/EE4-L06-C04-A02-P01.eps',
    alt: ` 돋보기를 들고 있는 탐정 그림`,
    title: ` 돋보기를 들고 있는 탐정 그림`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
