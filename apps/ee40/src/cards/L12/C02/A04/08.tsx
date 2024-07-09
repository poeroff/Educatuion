// Page: EE4-L12-C02-A04-P08

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '수아와 윌 중 원하는 인물을 선택하여 역할놀이를 해봅시다.',
  },
  pageNumber: 8,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Will! What do you do on\n weekends?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '수아',
      color: '#FFF0CC',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'I read books. How about you?',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '윌',
      color: '#E2F2FF',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P08-02.mp3',
      audioData: null,
    },
    {
      question: 'I walk my dog.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '수아',
      color: '#FFF0CC',
      audio: '/L12/C02/A04/EE4-L12-C02-A04-P08-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '수아', value: '1', color: 'yellow' },
    { text: '윌', value: '2', color: 'blue' },
  ],
  BoxInfo: {
    width: '75px',
  },
};

const P08 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P08;
