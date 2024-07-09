// Page: EE4-L01-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시 아빠와 루시의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'He’s tall. Who is he?',
      answer: '그는 키가 크다. 그는 누구니?',
      character: '루시 아빠',
      color: '#E2F2FF',
      audio: '/L03/C02/A04/EE4-L03-C02-A04-P07-01.mp3',
    },
    {
      question: 'He’s my teacher.',
      answer: '그는 나의 선생님이에요.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L03/C02/A04/EE4-L03-C02-A04-P07-02.mp3',
    },
  ],
  BoxInfo:  {
    width: '123px',
  },
};

const P07 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P07;