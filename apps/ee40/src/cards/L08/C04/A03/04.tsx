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
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hmm... It’s raining.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '포그',
      color: '#E5F4EA',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P04-01.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'It’s so windy. Help me, please.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '파스파르투',
      color: '#FFF0CC',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P04-02.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'Okay. We can go there.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '포그',
      color: '#E5F4EA',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P04-03.mp3',
      audioData: null,
      // isListen: false,
    },
  ],
  groupData: [
    { text: '포그', value: '1', color: 'green' },
    { text: '파스파르투', value: '2', color: 'yellow' },
  ],
  BoxInfo: {
    width: '138px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
