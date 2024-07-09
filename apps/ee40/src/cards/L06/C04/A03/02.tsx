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
  mainKey: [0, 1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Good morning, Watson.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P02-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Good morning, Sherlock. What are you doing?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '왓슨',
      color: '#E5F4EA',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P02-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'I’m reading a book.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P02-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Look at this.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '왓슨',
      color: '#E5F4EA',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P02-04.mp3',
      audioData: null,
      isListen: false,
    },

    {
      question: 'Okay. Let’s go.',
      mainKey: 4,
      subKey: 'RECORDER-05',
      type: '1',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P02-05.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '셜록', value: '1', color: 'yellow' },
    { text: '왓슨', value: '2', color: 'green' },
  ],
};

const P02 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P02;
