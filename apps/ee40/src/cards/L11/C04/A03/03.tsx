// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '두 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'It’s time for lunch. I like steak.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '2',
      character: '톰',
      color: '#C0E4CB',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P03-01.mp3',
      audioData: null,
    },
    {
      question: 'Hello. It’s Wednesday today.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '1',
      character: '클레버',
      color: '#FFF0CC',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P03-02.mp3',
      audioData: null,
    },
    {
      question: 'Oh... I have reading class.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '2',
      character: '톰',
      color: '#C0E4CB',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P03-03.mp3',
      audioData: null,
    },
    {
      question: 'Yes!',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '1',
      character: '클레버',
      color: '#FFF0CC',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P03-04.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '클레버', value: '1', color: 'yellow' },
    { text: '톰', value: '2', color: 'green' },
  ],
  BoxInfo: {
    width: '96px',
  },
};

const P03 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P03;
