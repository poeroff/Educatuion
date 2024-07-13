import { P04PageProps } from '.';

import EE4L04C01A06aP03 from '@/Pages/EE4L04C01A06aP03';

const listData = [
  {
    isClick: false,
    audioSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P03-01.mp3',
    data: [{ question: "Dont'run please", answer: '달리지 말아 줘.', type: 'W', color: '#E2F2FF' }],
  },
  {
    isClick: false,
    audioSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P03-02.mp3',
    data: [{ question: "Dont'talk please", answer: '말하지 말아 줘', type: 'M', color: '#FFF0CC' }],
  },
  {
    isClick: false,
    audioSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P03-03.mp3',
    data: [{ question: "Dont'eat please", answer: '먹지 말아줘', type: 'W', color: '#E2F2FF' }],
  },

  {
    isClick: false,
    audioSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P03-04.mp3',
    data: [{ question: "Dont'enter please", answer: '들어오지 말아줘', type: 'M', color: '#FFF0CC' }],
  },
  {
    isClick: false,
    audioSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P03-05.mp3',
    data: [{ question: "Dont'push, please", answer: '밀지 말아 줘', type: 'G', color: '#FFF0CC' }],
  },
];

const pageInfo: P04PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '공부한 문장을 다시 한번 들어 봅시다.',
  },
  list: listData,
};

const P03 = () => {
  const { headerInfo, questionInfo, list } = pageInfo;

  return <EE4L04C01A06aP03 headerInfo={headerInfo} questionInfo={questionInfo} pageData={list} />;
};

export default P03;
