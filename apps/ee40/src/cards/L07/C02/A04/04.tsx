// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시와 하준 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 4,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'What time is it?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'It’s 6 o’clock. It’s time for dinner.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '하준',
      color: '#FFECF1',
      audio: '/L07/C02/A04/EE4-L07-C02-A04-P04-02.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '루시', value: '1', color: 'yellow' },
    { text: '하준', value: '2', color: 'pink' },
  ],
};

const P04 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P04;
