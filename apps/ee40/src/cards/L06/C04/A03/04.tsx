// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '세 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 4,
  mainKey: [0, 1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello. What’s your name?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P04-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'My name is Cindy.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '신디',
      color: '#FFECF1',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P04-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'What are you doing here?',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '셜록',
      color: '#FFF0CC',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P04-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'I... I’m listening to music.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '신디',
      color: '#FFECF1',
      audio: '/L06/C04/A03/EE4-L06-C04-A03-P04-04.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '셜록', value: '1', color: 'yellow' },
    { text: '신디', value: '2', color: 'pink' },
  ],
};

const P04 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P04;
