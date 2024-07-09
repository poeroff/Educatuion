import { getCorrectData, getDefaultData } from './pageData';
import EEL01C02A04P04, { PageProps } from '@/Pages/EEL01C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌 아빠와 윌 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 8,
  mainKey: [0, 1],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Will! Put on this helmet, please.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '윌 아빠',
      color: '#E2F2FF',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'Ah! Okay.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '윌',
      color: '#FFF0CC',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P08-02.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '윌 아빠', value: '1', color: 'blue' },
    { text: '윌', value: '2', color: 'yellow' },
  ],
};

const P08 = () => {
  return <EEL01C02A04P04 {...pageInfo} />;
};

export default P08;
