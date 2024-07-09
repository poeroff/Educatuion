// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '수아와 윌 중 원하는 인물을 선택하여 역할놀이를 해봅시다.',
  },
  pageNumber: 4,
  mainKey: [0, 1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'Hello, Sua. What are you doing?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'I’m cleaning.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P04-03.mp3',
      audioData: null,
    },
    {
      question: 'Let’s play badminton.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '2',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P04-04.mp3',
      audioData: null,
    },
    {
      question: '  Sure.',
      mainKey: 4,
      subKey: 'RECORDER-03',
      type: '1',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P04-05.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '수아', value: '1', color: 'blue' },
    { text: '윌', value: '2', color: 'yellow' },
  ],
};

const P04 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P04;
