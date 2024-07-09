// Page: EE4-L01-C02-A04-P04

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시 아빠와 루시 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 8,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'He’s tall. Who is he?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '루시 아빠',
      color: '#E2F2FF',
      audio: '/L03/C02/A04/EE4-L03-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'He’s my teacher.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L03/C02/A04/EE4-L03-C02-A04-P08-02.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '루시 아빠', value: '1', color: 'blue' },
    { text: '루시', value: '2', color: 'yellow' },
  ],
  BoxInfo:  {
    width: '123px',
  },
};

const P08 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P08;