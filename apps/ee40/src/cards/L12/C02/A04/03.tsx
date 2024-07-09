// Page: EE4-L01-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '하준과 루시의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'What do you do on weekends?',
      answer: '너는 주말에 무엇을 하니?',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P03-01.mp3',
    },
    {
      question: 'I play the piano.',
      answer: '나는 피아노를 쳐.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P03-02.mp3',
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