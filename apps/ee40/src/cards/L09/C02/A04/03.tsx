// Page: EE4-L09-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시와 루시 아빠의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [0, 1],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Where is my bag?',
      answer: '내 가방이 어디 있죠?',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P03-01.mp3',
    },
    {
      question: 'It’s on the bed.',
      answer: '침대 위에 있어.',
      character: '루시 아빠',
      color: '#FFF0CC',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P03-02.mp3',
    },
  ],
  BoxInfo: {
    width: '123px',
  },
};

const P03 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P03;
