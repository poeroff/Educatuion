// Page: EE4-L01-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '수아와 윌의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02',  'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'What do you do on weekends?',
      answer: '너는 주말에 무엇을 하니?',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P07-01.mp3',
    },
    {
      question: 'I read books. How about you?',
      answer: '나는 책을 읽어. 너는 어때?',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P07-02.mp3',
    },
    {
      question: 'I walk my dog.',
      answer: '나는 강아지를 산책시켜.',
      character: '수아',
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
