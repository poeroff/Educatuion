// Page: EE4-L06-C02-A04-P03

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
  mainKey: [1, 2, 3, 4, 5],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-5'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello.',
      answer: '여보세요.',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P03-01.mp3',
    },
    {
      question: 'Hello, Sua. \n What are you doing?',
      answer: '여보세요, 수아야. \n 무엇을 하고 있어?',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P03-02.mp3',
    },
    {
      question: 'I’m cleaning.',
      answer: '나는 청소하고 있어.',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P03-03.mp3',
    },
    {
      question: 'Let’s play badminton.',
      answer: '우리 배드민턴을 하자.',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P03-03.mp3',
    },
    {
      question: 'Sure.',
      answer: '물론이지.',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P03-03.mp3',
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