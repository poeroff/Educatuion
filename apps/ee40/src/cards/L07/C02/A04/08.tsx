// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌 엄마와 윌 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 8,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'It’s time for breakfast.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '윌 엄마',
      color: '#FFF0CC',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'What time is it?',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '윌',
      color: '#E2F2FF',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'It’s 8:30. It’s time for school.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '윌 엄마',
      color: '#FFF0CC',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P04-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '윌 엄마', value: '1', color: 'yellow' },
    { text: '윌', value: '2', color: 'blue' },
  ],
};

const P08 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P08;
