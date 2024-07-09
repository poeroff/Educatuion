// Page: EE4-L09-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌, 수아, 그리고 하준의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Where is my ball?',
      answer: '내 공이 어디 있지?',
      character: '윌',
      color: '#E2F2FF',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P07-01.mp3',
    },
    {
      question: 'I don’t know.',
      answer: '잘 모르겠어.',
      character: '수아',
      color: '#FFF0CC',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P07-02.mp3',
    },
    {
      question: 'It’s under the table.',
      answer: '탁자 아래에 있어.',
      character: '하준',
      color: '#E5F4EA',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P07-03.mp3',
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
