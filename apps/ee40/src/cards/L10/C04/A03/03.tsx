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
      question: 'Are you okay, Cinderella?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '요정 할머니',
      color: '#E5F4EA',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P03-01.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'No, I’m not. I’m sad.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '신데렐라',
      color: '#FFECF1',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P03-02.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'I can help you. Bibidi, babidi, boo!',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '요정 할머니',
      color: '#E5F4EA',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P03-03.mp3',
      audioData: null,
      // isListen: false,
    },
    {
      question: 'Wow! It’s so beautiful. Thank you.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '신데렐라',
      color: '#FFECF1',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P03-04.mp3',
      audioData: null,
      // isListen: false,
    },
  ],
  groupData: [
    { text: '요정 할머니', value: '1', color: 'green' },
    { text: '신데렐라', value: '2', color: 'pink' },
  ],
  BoxInfo: {
    width: '96px', //피그마 확인 필요
  },
};

const P03 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P03;
