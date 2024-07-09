// Page: EE4-L08-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '루시, 루시 아빠, 그리고 점원의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 7,
  mainKey: [0, 1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Dad, I want this doll.',
      answer: '아빠, 이 인형을 갖고 싶어요.',
      character: '루시',
      color: '#E2F2FF',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P03-01.mp3',
    },
    {
      question: 'Okay. How much is it?',
      answer: '알겠어. 얼마예요?',
      character: '루시 아빠',
      color: '#FFF0CC',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P03-02.mp3',
    },
    {
      question: 'It’s 6,000 won.',
      answer: '육천 원이에요.',
      character: '점원',
      color: '#E5F4EA',
      audio: '/L08/C02/A04/EE4-L08-C02-A04-P03-03.mp3',
    },
  ],
  BoxInfo: {
    width: '123px',
  },
};

const P07 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P07;
