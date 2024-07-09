import EEL01C01A06P04 from '@/Pages/EEL01C01A06P04';
import { P04PageProps } from '../../C02/A05a';

const listData = [
  {
    isClick: false,
    audioSrc: '/L06/C01/A06a/EE4-L06-C01-A06a-P03-01.mp3',
    data: [
      { question: 'What are youn doing?', answer: '무엇을 하고있니?', type: 'B', color: '#FFF0CC' },
      { question: "I'm cooking", answer: '나는 요리하고 있어', type: 'G', color: '#E2F2FF' },
    ],
  },
  {
    isClick: false,
    audioSrc: '/L06/C01/A06a/EE4-L06-C01-A06a-P03-02.mp3',
    data: [
      { question: 'What are youn doing?', answer: '무엇을 하고있니?', type: 'B', color: '#FFF0CC' },
      { question: "I'm listening to music", answer: '나는 음악을 듣고 있어', type: 'G', color: '#E2F2FF' },
    ],
  },
  {
    isClick: false,
    audioSrc: '/L06/C01/A06a/EE4-L06-C01-A06a-P03-03.mp3',
    data: [
      { question: 'What are youn doing?', answer: '무엇을 하고있니?', type: 'B', color: '#FFF0CC' },
      { question: "I'm reading a book", answer: '나는 책을 읽고 있어', type: 'G', color: '#E2F2FF' },
    ],
  },

  {
    isClick: false,
    audioSrc: '/L06/C01/A06a/EE4-L06-C01-A06a-P03-04.mp3',
    data: [
      { question: 'What are youn doing?', answer: '무엇을 하고있니?', type: 'B', color: '#FFF0CC' },
      { question: "I'm drawing a picture", answer: '나는 그림을 그리고 있어', type: 'G', color: '#E2F2FF' },
    ],
  },
];

const pageInfo: P04PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  },
  list: listData,
};

const P03 = () => {
  const { headerInfo, questionInfo, list } = pageInfo;

  return <EEL01C01A06P04 headerInfo={headerInfo} questionInfo={questionInfo} pageData={list} />;
};

export default P03;
