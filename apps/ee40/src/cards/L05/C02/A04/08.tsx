// Page: EE4-L05-C02-A04-P08

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시와 하준 중 원하는 인물을 선택하여 역할놀이를 해봅시다.',
  },
  pageNumber: 8,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P08-01.mp3',
      audioData: null,
    },
    {
      question: 'Hello, Lucy! Let’s play baseball.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P08-02.mp3',
      audioData: null,
    },
    {
      question: 'Sorry, I can’t. I’m sick.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P08-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '루시', value: '1', color: 'yellow' },
    { text: '하준', value: '2', color: 'blue' },
  ],
  BoxInfo: {
    width: '75px',
  },
};

const P08 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P08;
