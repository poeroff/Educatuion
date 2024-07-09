// Page: EE4-LK2-C02-A03-P02

import EEL05C03A10P03, { PageProps } from '@/Pages/EEL05C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Check',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '인터넷으로 ‘스포츠 스태킹의 특징’을 검색해 본 후, 그 특징을 적어 봅시다.',
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
