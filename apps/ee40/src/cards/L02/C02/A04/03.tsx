// Page: EE4-L02-C02-A04-P03

import EEL02C02A04P03, { PageProps } from '@/Pages/EEL02C02A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
  },
  questionInfo: {
    text: '하준, 루시, 그리고 하준 아빠의 대화를 듣고, 따라 말해 봅시다.',
  },
  pageNumber: 3,
  mainKey: [1, 2, 3],
  subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  getCorrectData,
  getDefaultData,
  data: [
    {
      question: 'Dad, this is Lucy. \n Lucy, this is my dad.',
      answer: '아빠, 이 아이는 루시예요.\n 루시, 이 분은 나의 아빠셔.',
      character: '하준',
      color: '#E2F2FF',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P03-01.mp3',
    },
    {
      question: 'Nice to meet you.',
      answer: '만나서 반갑습니다.',
      character: '루시',
      color: '#FFF0CC',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P03-02.mp3',
    },
    {
      question: 'Nice to meet you, too.',
      answer: '아주 좋아. 고마워.',
      character: '하준 아빠',
      color: '#FFECF1',
      audio: '/L02/C02/A04/EE4-L02-C02-A04-P03-03.mp3',
    },
  ],
  BoxInfo:  {
    width: '123px',
  },
};

const P03 = () => {
  return <EEL02C02A04P03 {...pageInfo} />;
};

export default P03;