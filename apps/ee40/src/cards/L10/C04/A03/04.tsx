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
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Let’s dance together.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '왕자',
      color: '#E2F2FF',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P04-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Sure. Oh, no! It’s 12 o’clock. I’m late.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '신데렐라',
      color: '#FFECF1',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P04-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Please, don’t go.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '왕자',
      color: '#E2F2FF',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P04-03.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '왕자', value: '1', color: 'blue' },
    { text: '신데렐라', value: '2', color: 'pink' },
  ],
};

const P04 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P04;
