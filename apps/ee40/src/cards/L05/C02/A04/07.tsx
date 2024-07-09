// Page: EE4-L05-C02-A04-P07

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
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello.',
      answer: '안녕.',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P07-01.mp3',
    },
    {
      question: 'Hello, Lucy! Let’s play baseball.',
      answer: '안녕, 루시! 우리 야구 하자.',
      character: '하준',
      color: '#FFF0CC',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P07-02.mp3',
    },
    {
      question: 'Sorry, I can’t. I’m sick.',
      answer: '미안해, 나는 할 수 없어. 나는 아파.',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P07-03.mp3',
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
