// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '첫 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 2,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello, Edward. What day is it today?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '클레버',
      color: '#FFF0CC',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P02-01.mp3',
      audioData: null,
    },
    {
      question: 'It’s Tuesday. Oh, I have art class.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '톰',
      color: '#C0E4CB',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P02-02.mp3',
      audioData: null,
    },
    {
      question: 'That’s right!',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '클레버',
      color: '#FFF0CC',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P02-03.mp3',
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

const P02 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P02;