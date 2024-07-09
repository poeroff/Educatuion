// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '세 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 4,
  mainKey: [1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Let’s play basketball!',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '닐슨',
      color: '#FFECF1',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'Sure.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '토미',
      color: '#FFF0CC',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'I can help you.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '삐삐',
      color: '#E2F2FF',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P04-03.mp3',
      audioData: null,
    },
    {
      question: 'Thank you, Pippi.',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '4',
      character: '아니카',
      color: '#E5F4EA',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P04-04.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '닐슨', value: '1', color: 'pink' },
    { text: '토미', value: '2', color: 'yellow' },
    { text: '삐삐', value: '3', color: 'blue' },
    { text: '아니카', value: '4', color: 'green' },
  ],
};

const P04 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P04;
