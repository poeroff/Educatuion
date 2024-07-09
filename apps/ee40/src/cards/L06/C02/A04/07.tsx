// Page: EE4-L06-C02-A04-P07

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '하준과 루시의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02',  'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Will!',
      answer: '윌!',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P07-01.mp3',
    },
    {
      question: 'What is he doing?',
      answer: '그는 무엇을 하고 있니?',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P07-02.mp3',
    },
    {
      question: 'He’s reading a book.',
      answer: '그는 책을 읽고 있어.',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P07-03.mp3',
    },
  ],
  BoxInfo: {
    width: '75px',
  },
};

const P07 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P07;