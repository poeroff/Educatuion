// Page: EE4-L10-C02-A04-P07

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '직원과 루시의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Is this your scarf?',
      answer: '이게 네 스카프니?',
      character: '직원',
      color: '#E2F2FF',
      audio: '/L10/C02/A04/EE4-L10-C02-A04-P07-01.mp3',
    },
    {
      question: 'No, it isn’t. My scarf is long.',
      answer: '아니요, 그렇지 않아요. 제 스카프는 길어요.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L10/C02/A04/EE4-L10-C02-A04-P07-02.mp3',
    },
    {
      question: 'Here you are.',
      answer: '여기 있어.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L10/C02/A04/EE4-L10-C02-A04-P07-03.mp3',
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