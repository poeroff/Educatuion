// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '네 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 5,
  mainKey: [0, 1, 2, 3, 4, 5, 6],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05', 'RECORDER-06', 'RECORDER-07'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'It’s my shoe.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '새언니',
      color: '#FFF0CC',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'It’s too small.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '왕자',
      color: '#E2F2FF',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'What’s your name?',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '2',
      character: '왕자',
      color: '#E2F2FF',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'My name is Cinderella.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '3',
      character: '신데렐라',
      color: '#FFECF1',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-04.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Is this your shoe?',
      mainKey: 4,
      subKey: 'RECORDER-05',
      type: '2',
      character: '왕자',
      color: '#E2F2FF',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-05.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Yes, it is.',
      mainKey: 5,
      subKey: 'RECORDER-06',
      type: '3',
      character: '신데렐라',
      color: '#FFECF1',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-06.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'It’s you, Cinderella. I’m so happy.',
      mainKey: 6,
      subKey: 'RECORDER-07',
      type: '2',
      character: '왕자',
      color: '#E2F2FF',
      audio: '/L10/C04/A03/EE4-L10-C04-A03-P05-07.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '새언니', value: '1', color: 'yellow' },
    { text: '왕자', value: '2', color: 'blue' },
    { text: '신데렐라', value: '3', color: 'pink' },
  ],
};

const P05 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P05;
