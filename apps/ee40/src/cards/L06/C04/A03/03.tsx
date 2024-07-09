// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '두 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 3,
  mainKey: [0, 1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: ' What is she doing?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '왓슨',
      color: '#E5F4EA',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P03-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'She’s drawing a picture.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P03-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Do you have a brush?',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '2',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P03-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Yes, I do. is is my brush.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '3',
      character: '화가',
      color: '#E2F2FF',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P03-04.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '왓슨', value: '1', color: 'green' },
    { text: '셜록', value: '2', color: 'yellow' },
    { text: '화가', value: '3', color: 'blue' },
  ],
};

const P03 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P03;
