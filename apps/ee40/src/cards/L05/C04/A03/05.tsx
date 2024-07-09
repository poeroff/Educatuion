// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '네 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 4,
  mainKey: [1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'I’m so happy today.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '토미',
      color: '#FFF0CC',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P05-01.mp3',
      audioData: null,
    },
    {
      question: 'Me, too.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '닐슨',
      color: '#FFECF1',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P05-02.mp3',
      audioData: null,
    },
    {
      question: 'You’re a good friend, Pippi.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '아니카',
      color: '#E5F4EA',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P05-03.mp3',
      audioData: null,
    },
    {
      question: 'Ha-ha. Thank you.',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '4',
      character: '삐삐',
      color: '#E2F2FF',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P05-04.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '토미', value: '1', color: 'yellow' },
    { text: '닐슨', value: '2', color: 'pink' },
    { text: '아니카', value: '3', color: 'green' },
    { text: '삐삐', value: '4', color: 'blue' },
  ],
};

const P04 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P04;
