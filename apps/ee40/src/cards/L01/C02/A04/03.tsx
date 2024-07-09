// Page: EE4-L01-C02-A04-P03

import EEL01C02A04P03, { PageProps } from '@/Pages/EEL01C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Answer',
  },
  questionInfo: {
    text: '선생님과 루시의 대화를 듣고, 따라 말해 봅시다',
  },
  pageNumber: 3,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Hi, Lucy. How are you?',
      answer: '루시야, 안녕. 기분이 어때?',
      character: '선생님',
      color: '#E2F2FF',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P03-01.mp3',
      audioData: null,
    },
    {
      question: 'I’m good. How are you?',
      answer: '좋아요. 기분이 어때요?',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P03-02.mp3',
      audioData: null,
    },
    {
      question: 'I’m great. Thanks.',
      answer: '아주 좋아. 고마워.',
      character: '선생님',
      color: '#E2F2FF',
      audio: '/L01/C02/A04/EE4-L01-C02-A04-P03-03.mp3',
      audioData: null,
    },
  ],
};

const P03 = () => {
  return <EEL01C02A04P03 {...pageInfo} />;
};

export default P03;
