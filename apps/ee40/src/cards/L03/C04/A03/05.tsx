import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act out',
  },
  questionInfo: {
    text: '네 번째 장면에서 원하는 역할을 골라 역할놀이를 해 봅시다.',
  },
  pageNumber: 5,
  mainKey: [0, 1, 2, 3, 4],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04', 'RECORDER-05'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Pinocchio! Pinocchio!',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '할아버지',
      color: '#FFECF1',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P05-01.mp3',
      audioData: null,
    },
    {
      question: 'Who is he?',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '호퍼',
      color: '#FFF0CC',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P05-02.mp3',
      audioData: null,
    },
    {
      question: 'He’s my grandpa. Grandpa!',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '피노키오',
      color: '#E5F4EA',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P05-03.mp3',
      audioData: null,
    },
    {
      question: 'Oh, Pinocchio, come here.',
      mainKey: 3,
      subKey: 'RECORDER-04',
      type: '1',
      character: '할아버지',
      color: '#FFECF1',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P05-04.mp3',
      audioData: null,
    },
    {
      question: 'Thank you, grandpa.',
      mainKey: 4,
      subKey: 'RECORDER-05',
      type: '3',
      character: '피노키오',
      color: '#E5F4EA',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P05-05.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '할아버지', value: '1', color: 'pink' },
    { text: '호퍼', value: '2', color: 'yellow' },
    { text: '피노키오', value: '3', color: 'green' },
  ],
  BoxInfo: {
    width: '117px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
