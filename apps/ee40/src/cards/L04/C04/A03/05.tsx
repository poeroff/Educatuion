import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act Out',
  },
  questionInfo: {
    text: '네 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  },
  pageNumber: 5,
  mainKey: [1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Put on this helmet, please.',
      mainKey: 1,
      subKey: 'RECORDER-01',
      type: '1',
      character: '스키장 직원',
      color: '#E2F2FF',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P05-01.mp3',
      audioData: null,
    },
    {
      question: 'Thank you.',
      mainKey: 2,
      subKey: 'RECORDER-02',
      type: '2',
      character: '청개구리',
      color: '#E5F4EA',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P05-02.mp3',
      audioData: null,
    },
    {
      question: 'You’re welcome. Line up, please.',
      mainKey: 3,
      subKey: 'RECORDER-03',
      type: '1',
      character: '스키장 직원',
      color: '#E2F2FF',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P05-03.mp3',
      audioData: null,
    },
    {
      question: 'Okay.',
      mainKey: 4,
      subKey: 'RECORDER-04',
      type: '2',
      character: '청개구리',
      color: '#E5F4EA',
      audio: '/L04/C04/A03/EE4-L04-C04-A03-P05-04.mp3',
      audioData: null,
    },
  ],

  groupData: [
    { text: '스키장 직원', value: '1', color: 'blue' },
    { text: '청개구리', value: '2', color: 'green' },
  ],
  BoxInfo:  {
    width: '144px',
  },
};

const P05 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P05;
