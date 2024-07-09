// Page: EE4-L01-C01-A06-P03

// pageData
import { getCorrectData, getDefaultData } from './pageData';

// Template
import EE4L01C01A06, { PageProps } from '@/Pages/EEL01C01A06';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '잘 듣고, 여자아이의 얼굴 표정을 골라 봅시다.',
  },
  audioInfo: {
    audioSrc: '/L01/C01/A06/EE4-L01-C01-A06-P03.mp3',
    captionSrc: '/L01/C01/A06/EE4-L01-C01-A06-P03.srt',
  },
  headImage: {
    src: '/L01/C01/A06/EE4-L01-C01-A06-P03.png',
    alt: '표정이 없는 여자아이',
    title: '표정이 없는 여자아이',
  },
  getCorrectData,
  getDefaultData,
  pageData: [
    {
      src: '/L01/C01/A06/EE4-L01-C01-A06-P01-02.jpg',
      alt: '활짝 웃고 있는 표정',
    },
    {
      src: '/L01/C01/A06/EE4-L01-C01-A06-P01-03.jpg',
      alt: '웃고 있는 표정',
    },
    {
      src: '/L01/C01/A06/EE4-L01-C01-A06-P01-04.jpg',
      alt: '기분이 좋지 않은 표정',
    },
  ],
  pageNumber: 3,
  mainKey: 0,
  subKey: 'NUMBER-03',
};

const Component = () => {
  return <EE4L01C01A06 {...pageInfo} />;
};

export default Component;
