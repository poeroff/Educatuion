// Page: EE4-L02-C02-A04-P08

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '직원과 윌 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 8,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hi, Lucy. How are you?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '직원',
      color: '#E2F2FF',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'I’m good. How are you?',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P08-02.mp3',
      audioData: null,
    },
    {
      question: 'I’m good. How are you?',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '직원',
      color: '#E2F2FF',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P08-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '직원', value: '1', color: 'blue' },
    { text: '윌', value: '2', color: 'yellow' },
  ],
  BoxInfo:  {
    width: '75px',
  },
};

const P08 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P08;