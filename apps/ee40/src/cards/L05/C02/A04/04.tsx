import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '윌과 수아 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 4,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Let’s play soccer.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '윌',
      color: '#E2F2FF',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'Sure!',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '수아',
      color: '#FFF0CC',
      audio: '/L05/C02/A04/EE4-L05-C02-A04-P04-02.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '윌', value: '1', color: 'blue' },
    { text: '수아', value: '2', color: 'yellow' },
  ],
  BoxInfo: {
    width: '75px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
