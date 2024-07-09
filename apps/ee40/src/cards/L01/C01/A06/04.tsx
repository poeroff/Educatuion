import EEL01C01A06P04, { PageProps } from '@/Pages/EEL01C01A06P04';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  },
  pageData: [
    {
      isClick: false,
      audioSrc: '/L01/C01/A06/EE4-L01-C01-A06-P01.mp3',
      data: [
        { question: 'How are you?', answer: '기분이 어때?', type: 'G', color: '#E2F2FF' },
        { question: 'Not so good.', answer: '좋지 않아', type: 'B', color: '#FFF0CC' },
      ],
    },
    {
      isClick: false,
      audioSrc: '/L01/C01/A06/EE4-L01-C01-A06-P02.mp3',
      data: [
        { question: 'How are you?', answer: '기분이 어때?', type: 'G', color: '#E2F2FF' },
        { question: 'I`m good.', answer: '좋아.', type: 'B', color: '#FFF0CC' },
      ],
    },
    {
      isClick: false,
      audioSrc: '/L01/C01/A06/EE4-L01-C01-A06-P03.mp3',
      data: [
        { question: 'How are you?', answer: '기분이 어때?', type: 'G', color: '#E2F2FF' },
        { question: 'I`m great.', answer: '아주 좋아.', type: 'B', color: '#FFF0CC' },
      ],
    },
  ],
};

const Component = () => {
  return <EEL01C01A06P04 {...pageInfo} />;
};

export default Component;
