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
      question: 'Mom! Where is my book?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '사이먼',
      color: '#FFF0CC',
      audio: '/L09/C04/A03/EE4-L09-C04-A03-P02-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'It’s on the table.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '엄마',
      color: '#FFECF1',
      audio: '/L09/C04/A03/EE4-L09-C04-A03-P02-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Where is my bag?',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '아빠',
      color: '#E2F2FF',
      audio: '/L09/C04/A03/EE4-L09-C04-A03-P02-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'It’s under the chair.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '엄마',
      color: '#FFECF1',
      audio: '/L09/C04/A03/EE4-L09-C04-A03-P02-04.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Oh, I’m tired.',
      mainKey: 4,
      subKey: 'RECORDER-05',
      type: '2',
      character: '엄마',
      color: '#FFECF1',
      audio: '/L09/C04/A03/EE4-L09-C04-A03-P02-05.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '사이먼', value: '1', color: 'yellow' },
    { text: '엄마', value: '2', color: 'pink' },
    { text: '아빠', value: '3', color: 'blue' },
  ],
};

const P02 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P02;