import { P04PageProps } from '../A06b';
import EE4L05C01A06aP04 from '@/Pages/EE4L05C01A06aP04';

const listData = [
  {
    isClick: false,
    audioSrc: '/L05/C01/A06a/EE4-L05-C01-A06a-P04.mp3',
    data: [
      { question: "Let's play basketball", answer: '우리 농구를 하자', type: 'G', color: '#E2F2FF' },
      { question: "Sorry, I can't. Let's play baseball", answer: '미안해 나는 할 수 없어. 우리 배드민턴을 하자.', type: 'B', color: '#FFF0CC' },
      { question: "Sorry, I can't. Let's play baseball", answer: '미안해, 나는 할 수 없어. 우리 야구를 하자', type: 'G', color: '#E2F2FF' },
      { question: 'Sure', answer: '좋아', type: 'B', color: '#FFF0CC' },
    ],
  },
];

const pageInfo: P04PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '공부한 대화를 다시 한번 들어 봅시다',
  },
  list: listData,
};

const P04 = () => {
  const { headerInfo, questionInfo, list } = pageInfo;

  return <EE4L05C01A06aP04 headerInfo={headerInfo} questionInfo={questionInfo} pageData={list} />;
};

export default P04;
