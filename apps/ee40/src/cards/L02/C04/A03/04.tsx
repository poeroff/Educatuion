// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '세 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 4,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Oh, no!',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '에릭',
      color: '#E2F2FF',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'Dad!',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '애리얼',
      color: '#FFF0CC',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'Ha-ha! I’m sorry.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '아버지',
      color: '#E5F4EA',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P04-03.mp3',
      audioData: null,
    },
    {
      question: 'EThat’s okay. Thank you.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '에릭',
      color: '#E2F2FF',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P04-04.mp3',
      audioData: null,
    },
    {
      question: 'Thank you.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '에릭',
      color: '#E2F2FF',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P04-05.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '에릭', value: '1', color: 'blue' },
    { text: '애리얼', value: '2', color: 'yellow' },
    { text: '아버지', value: '3', color: 'green' },
  ],
  BoxInfo:  {
    width: '96px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
