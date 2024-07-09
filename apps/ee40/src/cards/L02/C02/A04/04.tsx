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
  pageNumber: 4,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Dad, this is Lucy. \n Lucy, this is my dad.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '하준',
      color: '#FFF0CC',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'Nice to meet you.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'Nice to meet you, too.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '하준 아빠',
      color: '#FFECF1',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P04-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '하준', value: '1', color: 'blue' },
    { text: '루시', value: '2', color: 'yellow' },
    { text: '하준 아빠', value: '3', color: 'pink' },
  ],
  BoxInfo:  {
    width: '123px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;