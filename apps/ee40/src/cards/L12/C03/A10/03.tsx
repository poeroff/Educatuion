// Page: EE4-L12-C03-A10-P03

import EEL05C03A10P03, { PageProps } from '@/Pages/EEL05C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Mission 3_Try It',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '내가 주말에 하는 활동을 나타내는 어구를 써 봅시다.',
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
