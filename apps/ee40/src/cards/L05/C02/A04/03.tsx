// Page: EE4-L01-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌과 수아의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Let’s play soccer.',
      answer: '우리 축구 하자.',
      character: '윌',
      color: '#E2F2FF',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P03-01.mp3',
    },
    {
      question: 'Sure!',
      answer: '물론이지!',
      character: '수아',
      color: '#FFF0CC',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P03-02.mp3',
    },
  ],
  BoxInfo: {
    width: '75px',
  },
};

const P03 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P03;
