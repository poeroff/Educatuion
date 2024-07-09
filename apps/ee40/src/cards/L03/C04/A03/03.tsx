// Page: EE4-L03-C04-A03-P03

import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act out',
  },
  questionInfo: {
    text: '두 번째 장면에서 원하는 역할을 골라 역할놀이를 해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [0, 1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Can you jump?',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '호퍼',
      color: '#E2F2FF',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P03-01.mp3',
      audioData: null,
    },
    {
      question: 'Yes, I can. No, no. I can’t jump. I can dance.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '피노키오',
      color: '#FFF0CC',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P03-02.mp3',
      audioData: null,
    },
    {
      question: 'Do you like candy?',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '서커스 단장',
      color: '#E5F4EA',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P03-03.mp3',
      audioData: null,
    },
    {
      question: 'Yes, I do!',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '피노키오, 호퍼',
      color: '#FFF0CC',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P03-04.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '호퍼', value: '1', color: 'blue' },
    { text: '피노키오', value: '2', color: 'yellow' },
    { text: '서커스 단장', value: '3', color: 'green' },
  ],
  BoxInfo: {
    width: '200px',
  },
};

const P03 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P03;
