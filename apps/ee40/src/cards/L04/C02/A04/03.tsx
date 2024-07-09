// Page: EE4-L04-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '도서관 사서 선생님과 루시의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2],
  subKey: ['RECORDER-01', 'RECORDER-02'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Don’t eat, please.',
      answer: '먹지 마세요.',
      character: '도서관 사서 선생님',
      color: '#E2F2FF',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P03-01.mp3',
    },
    {
      question: 'Oh, I’m sorry.',
      answer: '오, 죄송해요.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L04/C02/A04/EE4-L04-C02-A04-P03-02.mp3',
    },
  ],
  BoxInfo: {
    width: '212px',
  },
};

const P03 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P03;
