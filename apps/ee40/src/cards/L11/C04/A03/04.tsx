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
  mainKey: [1, 2, 3, 4, 5],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'I want steak. I’m so hungry. \n What day is it today?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '에드워드',
      color: '#E2F2FF',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'It’s Sunday.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '친구',
      color: '#FFECF1',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'Sunday? What time is it?',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '에드워드',
      color: '#E2F2FF',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P04-03.mp3',
      audioData: null,
    },
    {
      question: 'It’s 12 o’clock.',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '2',
      character: '친구',
      color: '#FFECF1',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P04-04.mp3',
      audioData: null,
    },
    {
      question: 'Oh, no! I’m late.',
      mainKey: 5,
      subKey: 'RECORDER-05',
      type: '1',
      character: '에드워드',
      color: '#E2F2FF',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P04-05.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '에드워드', value: '1', color: 'blue' },
    { text: '친구', value: '2', color: 'pink' },
  ],
  BoxInfo: {
    width: '117px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
