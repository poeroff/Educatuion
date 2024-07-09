// Page: EE4-L04-C02-A04-P07

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌 아빠와 윌의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Will! \n Put on this helmet, please.',
      answer: '윌! \n 이 헬멧을 써줘.',
      character: '윌 아빠',
      color: '#E2F2FF',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P07-01.mp3',
    },
    {
      question: 'Ah! Okay.',
      answer: '아! 알겠어요.',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P07-02.mp3',
    },
  ],
  BoxInfo: {
    width: '102px',
  },
};

const P07 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P07;
