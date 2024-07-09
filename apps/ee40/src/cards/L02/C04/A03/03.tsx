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
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Eric, this is my sister.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '아델라',
      color: '#E2F2FF',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P03-01.mp3',
      audioData: null,
    },
    {
      question: 'Hello. Nice to meet you. What’s your name?',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '에릭',
      color: '#E5F4EA',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P03-02.mp3',
      audioData: null,
    },
    {
      question: 'My name is Ariel. Nice to meet you, too.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '애리얼',
      color: '#FFF0CC',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P03-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '아델라', value: '1', color: 'blue' },
    { text: '에릭', value: '2', color: 'green' },
    { text: '애리얼', value: '3', color: 'yellow' },
  ],
  BoxInfo:  {
    width: '96px',
  },
};

const P03 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P03;
