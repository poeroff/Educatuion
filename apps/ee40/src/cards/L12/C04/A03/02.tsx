// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '첫 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 2,
  mainKey: [0, 1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'It’s Friday today. \nWhat do you do on weekends?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '푸',
      color: '#FFF0CC',
      audio: '/L12/C04/A03/EE4-L12-C04-A03-P02-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'I play soccer. How about you?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '토끼',
      color: '#E5F4EA',
      audio: '/L12/C04/A03/EE4-L12-C04-A03-P02-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'I watch movies.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '푸',
      color: '#FFF0CC',
      audio: '/L12/C04/A03/EE4-L12-C04-A03-P02-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Good.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '토끼',
      color: '#E5F4EA',
      audio: '/L12/C04/A03/EE4-L12-C04-A03-P02-04.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '푸', value: '1', color: 'yellow' },
    { text: '토끼', value: '2', color: 'green' },
  ],
};

const P02 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P02;