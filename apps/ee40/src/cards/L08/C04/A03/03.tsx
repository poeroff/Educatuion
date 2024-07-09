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
  mainKey: [0, 1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Oh, it’s nice. I want this umbrella. \nHow much is it?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '포그',
      color: '#E5F4EA',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P03-01.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'It’s 1,000 won.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '상인',
      color: '#E2F2FF',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P03-02.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'Here you are.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '파스파르투',
      color: '#FFF0CC',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P03-03.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'Thank you.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '상인',
      color: '#E2F2FF',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P03-04.mp3',
      audioData: null,
      // isListen: false,
    },
  ],
  groupData: [
    { text: '포그', value: '1', color: 'green' },
    { text: '상인', value: '2', color: 'blue' },
    { text: '파스파르투', value: '3', color: 'yellow' },
  ],
  BoxInfo: {
    width: '138px',
  },
};

const P03 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P03;
