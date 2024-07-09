import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '도서관 사서 선생님과 루시 중 원하는 인물을 선택하여 역할놀이를 해 봅시다.',
  },
  pageNumber: 4,
  mainKey: [0, 1],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Don’t eat, please.',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '도서관 사서 선생님',
      color: '#FFF0CC',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'Oh, I’m sorry.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P04-02.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '도서관 사서 선생님', value: '1', color: 'yellow' },
    { text: '루시', value: '2', color: 'blue' },
  ],
  BoxInfo:  {
    width: '212px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
