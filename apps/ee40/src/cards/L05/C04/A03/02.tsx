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
  mainKey: [1, 2, 3, 4, 5, 6],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05', 'RECORDER-06'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'One, two, three, four.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '삐삐',
      color: '#FFF0CC',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P02-01.mp3',
      audioData: null,
    },
    {
      question: 'Welcome!',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '1',
      character: '삐삐',
      color: '#FFF0CC',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P02-02.mp3',
      audioData: null,
    },
    {
      question: 'Hello, Pippi. Hi, Nilsson.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '2',
      character: '토미',
      color: '#E5F4EA',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P02-03.mp3',
      audioData: null,
    },
    {
      question: 'Let’s play baseball.',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '3',
      character: '아니카',
      color: '#E2F2FF',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P02-04.mp3',
      audioData: null,
    },
    {
      question: 'Sure!',
      mainKey: 5,
      subKey: 'RECORDER-05',
      type: '1',
      character: '삐삐',
      color: '#FFF0CC',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P02-05.mp3',
      audioData: null,
    },
    {
      question: 'Sorry, I can’t. I’m tired.',
      mainKey: 6,
      subKey: 'RECORDER-06',
      type: '4',
      character: '닐슨',
      color: '#FFECF1',
      audio: '/L05/C04/A03/EE4-L05-C04-A03-P02-06.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '삐삐', value: '1', color: 'yellow' },
    { text: '토미', value: '2', color: 'green' },
    { text: '아니카', value: '3', color: 'blue' },
    { text: '닐슨', value: '4', color: 'pink' },
  ],
};

const P02 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P02;
