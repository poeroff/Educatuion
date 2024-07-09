// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '하준과 루시 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 8,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Will!',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'What is he doing?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P08-02.mp3',
      audioData: null,
    },
    {
      question: 'He’s reading a book.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L06/C02/A04/EE4-L06-C02-A04-P08-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '하준', value: '1', color: 'yellow' },
    { text: '루시', value: '2', color: 'blue' },
  ],
};

const P08 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P08;
