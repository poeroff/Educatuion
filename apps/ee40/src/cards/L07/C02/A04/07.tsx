// Page: EE4-L06-C02-A04-P07

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌 엄마와 윌의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'It’s time for breakfast.',
      answer: '아침 식사할 시간이야.',
      character: '윌 엄마',
      color: '#E2F2FF',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P07-01.mp3',
    },
    {
      question: 'What time is it?',
      answer: '몇 시예요?',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P07-02.mp3',
    },
    {
      question: 'It’s 8:30. It’s time for school.',
      answer: '8시 30분이야. 학교 갈 시간이야.',
      character: '윌 엄마',
      color: '#E2F2FF',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P07-03.mp3',
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
