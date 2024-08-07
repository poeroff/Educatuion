import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '첫 번째 장면에서 원하는 역할을 골라 역할놀이를 해 봅시다.',
  },
  pageNumber: 2,
  mainKey: [0, 1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hello, Pinocchio!',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '호퍼',
      color: '#E2F2FF',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P02-01.mp3',
      audioData: null,
    },
    {
      question: 'Good afternoon, Hopper',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '피노키오',
      color: '#FFF0CC',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P02-02.mp3',
      audioData: null,
    },
    {
      question: 'She’s tall. Who is she?',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '1',
      character: '호퍼',
      color: '#E2F2FF',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P02-03.mp3',
      audioData: null,
    },
    {
      question: 'She’s my mom. Oh, no. She’s my teacher.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '2',
      character: '피노키오',
      color: '#FFF0CC',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P02-04.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '호퍼', value: '1', color: 'blue' },
    { text: '피노키오', value: '2', color: 'yellow' },
  ],
  BoxInfo: {
    width: '117px',
  },
};

const P02 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P02;
