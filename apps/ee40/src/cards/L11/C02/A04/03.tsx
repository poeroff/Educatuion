// Page: EE4-L11-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '수아와 윌의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'What day is it today?',
      answer: '오늘 무슨 요일이니?',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L11/C02/A04/EE4-L11-C02-A04-P03-01.mp3',
    },
    {
      question: 'It’s Saturday.',
      answer: '토요일이야.',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L11/C02/A04/EE4-L11-C02-A04-P03-02.mp3',
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
