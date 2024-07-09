// Page: EE4-L09-C03-A10-P03

import EEL05C03A10P03, { PageProps } from '@/Pages/EEL05C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Mission 3_Try It',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '집에 가방 두는 위치를 어구로 써 봅시다.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 3,
  mainKey: 3,
  subKey: 'TEXT-01',
};

const P03 = () => {
  return <EEL05C03A10P03 {...pageInfo} />;
};

export default P03;
