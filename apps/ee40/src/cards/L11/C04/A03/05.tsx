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
  pageNumber: 5,
  mainKey: [1, 2, 3, 4, 5, 6],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05', 'RECORDER-06'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'I’m Edward.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '에드워드',
      color: '#E2F2FF',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P05-01.mp3',
      audioData: null,
    },
    {
      question: 'Oh, Edward. Don’t push.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '톰',
      color: '#C0E4CB',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P05-02.mp3',
      audioData: null,
    },
    {
      question: 'Here you are.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '2',
      character: '톰',
      color: '#C0E4CB',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P05-04.mp3',
      audioData: null,
    },
    {
      question: 'Thank you.',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '1',
      character: '에드워드',
      color: '#E2F2FF',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P05-05.mp3',
      audioData: null,
    },
    {
      question: 'I don’t like classes. I’m happy now.',
      mainKey: 5,
      subKey: 'RECORDER-05',
      type: '2',
      character: '톰',
      color: '#C0E4CB',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P05-06.mp3',
      audioData: null,
    },
    {
      question: 'Me, too.',
      mainKey: 6,
      subKey: 'RECORDER-06',
      type: '1',
      character: '에드워드',
      color: '#E2F2FF',
      audio: '/L11/C04/A03/EE4-L11-C04-A03-P05-07.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '에드워드', value: '1', color: 'blue' },
    { text: '톰', value: '2', color: 'green' },
  ],
  BoxInfo: {
    width: '117px',
  },
};

const P05 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P05;
