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
  mainKey: [0, 1, 2, 3, 4, 5],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05', 'RECORDER-06'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello. I’m Captain Speedy. Are you okay?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '선장',
      color: '#FFECF1',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P05-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'No, I’m not.  I’m sad.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '포그',
      color: '#E5F4EA',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P05-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Hmm. Come here. I have boats. Look!',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '선장',
      color: '#FFECF1',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P05-03.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Oh! I want this boat. How much is it?',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '포그',
      color: '#E5F4EA',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P05-04.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'It’s 700 dollars.',
      mainKey: 4,
      subKey: 'RECORDER-05',
      type: '1',
      character: '선장',
      color: '#FFECF1',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P05-05.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'Thank you.',
      mainKey: 5,
      subKey: 'RECORDER-06',
      type: '2',
      character: '포그',
      color: '#E5F4EA',
      audio: '/L08/C04/A03/EE4-L08-C04-A03-P05-06.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '선장', value: '1', color: 'pink' },
    { text: '포그', value: '2', color: 'green' },
  ],
};

const P05 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P05;
