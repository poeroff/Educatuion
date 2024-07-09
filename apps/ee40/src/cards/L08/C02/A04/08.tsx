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
      question: 'Dad, I want this doll.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'Okay. How much is it?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '루시 아빠',
      color: '#E2F2FF',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P08-02.mp3',
      audioData: null,
    },
    {
      question: 'It’s 6,000 won.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '점원',
      color: '#FFECF1',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P08-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '루시', value: '1', color: 'yellow' },
    { text: '루시 아빠', value: '2', color: 'blue' },
    { text: '점원', value: '3', color: 'pink' },
  ],
  BoxInfo: {
    width: '123px',
  },
};

const P08 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P08;
