import { P04PageProps } from '.';
import EE4L04C01A06bP04 from '@/Pages/EE4L04C01A06bP04';
const listData = [
  {
    isClick: false,
    audioSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P04-01.mp3',
    data: [{ question: "Dont'run please", answer: '달리지 말아 줘.', type: 'W', color: '#E2F2FF' }],
  },
  {
    isClick: false,
    audioSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P04-02.mp3',
    data: [{ question: "Dont'talk please", answer: '말하지 말아 줘', type: 'M', color: '#FFF0CC' }],
  },

  {
    isClick: false,
    audioSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P04-03.mp3',
    data: [{ question: "Dont'eat please", answer: '먹지 말아줘', type: 'W', color: '#E2F2FF' }],
  },
];

const pageInfo: P04PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '앞에서 들은 문장을 다시 한번 들어 봅시다.',
  },
  list: listData,
};

const Component = () => {
  const { headerInfo, questionInfo, list } = pageInfo;

  return <EE4L04C01A06bP04 headerInfo={headerInfo} questionInfo={questionInfo} pageData={list} />;
};

export default Component;
