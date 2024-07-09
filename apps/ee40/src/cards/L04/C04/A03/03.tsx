import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '두 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'How’s the weather?',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '청개구리',
      color: '#E5F4EA',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P03-01.mp3',
      audioData: null,
    },
    {
      question: 'It’s raining. Don’t swim today.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '엄마',
      color: '#E2F2FF',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P03-02.mp3',
      audioData: null,
    },
    {
      question: 'Okay.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '청개구리',
      color: '#E5F4EA',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P03-03.mp3',
      audioData: null,
    },
  ],

  groupData: [
    { text: '청개구리', value: '1', color: 'green' },
    { text: '엄마', value: '2', color: 'blue' },
  ],
  BoxInfo:  {
    width: '117px',
  },
};

const P03 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P03;
