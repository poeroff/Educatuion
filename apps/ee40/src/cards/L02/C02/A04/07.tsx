// Page: EE4-L02-C02-A04-P07

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '직원과 윌의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02, RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello. What’s your name?',
      answer: '안녕하세요. 이름이 무엇인가요?',
      character: '직원',
      color: '#E2F2FF',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P07-01.mp3',
    },
    {
      question: 'My name is Will, Will Brown.',
      answer: '제 이름은 윌이에요, 윌 브라운이에요.',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P07-02.mp3',
    },
    {
      question: 'Okay.',
      answer: '알겠습니다',
      character: '직원',
      color: '#E2F2FF',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P07-02.mp3',
    },
  ],
  BoxInfo:  {
    width: '75px',
  },
};

const P07 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P07;
