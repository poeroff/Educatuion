// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '네 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 5,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'This is my dad.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '애리얼',
      color: '#FFF0CC',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P05-01.mp3',
      audioData: null,
    },
    {
      question: 'Hello. My name is Eric.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '에릭',
      color: '#E2F2FF',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P05-02.mp3',
      audioData: null,
    },
    {
      question: 'Hi, Eric. Can you swim?',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '아버지',
      color: '#E5F4EA',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P05-03.mp3',
      audioData: null,
    },
    {
      question: 'No, I can’t.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '에릭',
      color: '#E2F2FF',
      audio: '/L02/C04/A03/EE4-L02-C04-A03-P05-04.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '애리얼', value: '1', color: 'yellow' },
    { text: '에릭', value: '2', color: 'blue' },
    { text: '아버지', value: '3', color: 'green' },
  ],
  BoxInfo:  {
    width: '96px',
  },
};

const P05 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P05;
