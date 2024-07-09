// Page: EE4-L08-C02-A04-P03

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
  mainKey: [0, 1],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 't’s a nice boat. How much is it?',
      answer: '멋진 배야. 얼마니?',
      character: '윌',
      color: '#E2F2FF',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P03-01.mp3',
    },
    {
      question: 'It’s 900 won.',
      answer: '구백 원이야.',
      character: '수아',
      color: '#FFF0CC',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P03-02.mp3',
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
