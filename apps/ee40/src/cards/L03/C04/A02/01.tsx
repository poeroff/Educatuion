import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '여러분은 정직한 사람인가요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L03/C04/A02/EE4-L03-C04-A02-P01.eps',
    alt: `거짓말을 할 때 코가 길어지는 피노키오 만화 얼굴`,
    title: `거짓말을 할 때 코가 길어지는 피노키오 만화 얼굴`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
