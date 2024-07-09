import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '여러분은 ‘청개구리 같다’라는 말을 들어 본 적이 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L04/C04/A02/EE4-L04-C04-A02-P01.eps',
    alt: `청개구리 한 마리 그림`,
    title: `청개구리 한 마리 그림`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
