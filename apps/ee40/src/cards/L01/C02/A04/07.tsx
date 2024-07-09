// Page: EE4-L01-C02-A04-P03

import EEL01C02A04P03, { PageProps } from '@/Pages/EEL01C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Answer',
  },
  questionInfo: {
    text: '수아와 윌의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [0, 1],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Good evening, Will.',
      answer: '좋은 저녁이야, 윌아.',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P07-01.mp3',
    },
    {
      question: 'Good evening, Sua.',
      answer: '좋은 저녁이야, 수아야.',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P07-02.mp3',
    },
  ],
};

const P07 = () => {
  return <EEL01C02A04P03 {...pageInfo} />;
};

export default P07;
