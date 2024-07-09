// Page: EE4-LK4-C02-A03-P02

import EEL05C03A10P03, { PageProps } from '@/Pages/EEL05C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Check',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '인터넷으로 ‘일본 경로의 날’을 검색해 본 후, 검색 결과를 적어 봅시다.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 2,
  mainKey: 2,
  subKey: 'TEXT-01',
};

const P02 = () => {
  return <EEL05C03A10P03 {...pageInfo} />;
};

export default P02;
