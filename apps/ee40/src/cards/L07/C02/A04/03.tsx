// Page: EE4-L07-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시와 하준의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'What time is it?',
      answer: '몇 시야?',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P03-01.mp3',
    },
    {
      question: 'It’s 6 o’clock. \n It’s time for dinner.',
      answer: '6시야. \n 저녁 식사할 시간이야.',
      character: '하준',
      color: '#FFF0CC',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P03-02.mp3',
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
