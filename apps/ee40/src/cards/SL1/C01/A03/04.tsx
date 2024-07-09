// Page: EE4-SL1-C01-A03-P04

import EEL05C03A10P03, { PageProps } from '@/Pages/EEL05C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Classroom English',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '우리 교실의 규칙을 만들어 봅시다.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 4,
  mainKey: 4,
  subKey: 'TEXT-01',
};

const P04 = () => {
  return <EEL05C03A10P03 {...pageInfo} />;
};

export default P04;
