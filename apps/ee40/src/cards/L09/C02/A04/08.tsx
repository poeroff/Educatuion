// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '세 인물 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 8,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Will! Put on this helmet, please.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'Ah! Okay.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '수아',
      color: '#E2F2FF',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P08-02.mp3',
      audioData: null,
    },
    {
      question: 'Will! Put on this helmet, please.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '하준',
      color: '#FFECF1',
      audio: '/L09/C02/A04/EE4-L09-C02-A04-P08-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '윌', value: '1', color: 'blue' },
    { text: '수아', value: '2', color: 'yellow' },
    { text: '하준', value: '3', color: 'pink' },
  ],
  BoxInfo: {
    width: '75px',
  },
};

const P08 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P08;
