// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Answer',
  },
  questionInfo: {
    text: '선생님과 루시 중 원하는 인물을 선택하여 역할놀이를 해봅시다.',
  },
  pageNumber: 4,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hi, Lucy. How are you?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '선생님',
      color: '#E2F2FF',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P03-01.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'I’m good. How are you?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P03-02.mp3',
      audioData: null,
      isListen: false,
    },
    {
      question: 'I’m great. Thanks.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '선생님',
      color: '#E2F2FF',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P03-03.mp3',
      audioData: null,
      isListen: false,
    },
  ],
  groupData: [
    { text: '선생님', value: '1', color: 'blue' },
    { text: '루시', value: '2', color: 'yellow' },
  ],
};

const P03 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P03;
