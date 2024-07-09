import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A04P04, { PageProps } from '@/Pages/EEL02C02A04P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Act out',
  },
  questionInfo: {
    text: '세 번째 장면에서 원하는 역할을 골라 역할놀이를 해 봅시다.',
  },
  pageNumber: 4,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Jump! Jump! Dance! Dance!',
      mainKey: 0,
      subKey: 'RECORDER-01',
      type: '1',
      character: '서커스 단장',
      color: '#E2F2FF',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P04-01.mp3',
      audioData: null,
    },
    {
      question: 'I’m tired. I’m hungry.',
      mainKey: 1,
      subKey: 'RECORDER-02',
      type: '2',
      character: '피노키오',
      color: '#E5F4EA',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P04-02.mp3',
      audioData: null,
    },
    {
      question: 'Me, too.',
      mainKey: 2,
      subKey: 'RECORDER-03',
      type: '3',
      character: '호퍼',
      color: '#FFF0CC',
      audio: '/L03/C04/A03/EE4-L03-C04-A03-P04-03.mp3',
      audioData: null,
    },
  ],
  groupData: [
    { text: '서커스 단장', value: '1', color: 'blue' },
    { text: '피노키오', value: '2', color: 'green' },
    { text: '호퍼', value: '3', color: 'yellow' },
  ],
  BoxInfo: {
    width: '144px',
  },
};

const P04 = () => {
  return <EEL02C02A04P04 {...pageInfo} />;
};

export default P04;
