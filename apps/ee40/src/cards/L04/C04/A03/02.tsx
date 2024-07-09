import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '첫 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 2,
  mainKey: [1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Don’t run, please.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '아빠',
      color: '#FFF0CC',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P02-01.mp3',
      audioData: null,
    },
    {
      question: 'No.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '청개구리',
      color: '#E5F4EA',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P02-02.mp3',
      audioData: null,
    },
    {
      question: 'Open the window, please.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '3',
      character: '엄마',
      color: '#E2F2FF',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P02-03.mp3',
      audioData: null,
    },
    {
      question: 'No!',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '2',
      character: '청개구리',
      color: '#E5F4EA',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P02-04.mp3',
      audioData: null,
    },
  ],

  groupData: [
    { text: '아빠', value: '1', color: 'yellow' },
    { text: '청개구리', value: '2', color: 'green' },
    { text: '엄마', value: '3', color: 'blue' },
  ],
  BoxInfo:  {
    width: '117px',
  },
};

const P02 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P02;
