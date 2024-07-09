// Page: EE4-L05-C03-A10-P03

import EEL05C03A10P03, { PageProps } from '@/Pages/EEL05C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Mission 3_Try It',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '좋아하는 운동을 하자고 제안하는 말을 써 보고, 친구에게 문자 메세지를 보내 봅시다.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 3,
  mainKey: 3,
  subKey: 'TEXT-01',
  textareaHeight: '336px'
};

const P03 = () => {
  return <EEL05C03A10P03 {...pageInfo} />;
};

export default P03;
