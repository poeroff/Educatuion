// Page: EE4-L11-C02-A04-P07

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
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'It’s Monday. I have art class.',
      answer: '오늘은 월요일이야. 나는 미술 수업이 있어.',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L11/C02/A04/EE4-L11-C02-A04-P07-01.mp3',
    },
    {
      question: 'I have robot class.',
      answer: '나는 로봇 수업이 있어.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L11/C02/A04/EE4-L11-C02-A04-P07-02.mp3',
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
