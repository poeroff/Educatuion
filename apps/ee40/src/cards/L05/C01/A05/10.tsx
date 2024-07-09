import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L05/C01/A05/EE4-L05-C01-A05-P10.mp3', captionSrc: '/L05/C01/A05/EE4-L05-C01-A05-P10.srt' },
};

const data = [
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'Let’s play soccer.',
    interpret: '우리 축구를 하자.',
  },
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'Sorry, I can’t',
    interpret: '미안해. 나는 할 수 없어.',
  },
];

const imgArr = [
  { src: '/L05/C01/A05/EE4-L05-C01-A05-P10-01.webp', alt: '남자아이가 한 발로 축구공을 잡고 서 있는 모습' },
  { src: '/L05/C01/A05/EE4-L05-C01-A05-P09-02.webp', alt: '책을 들고 있는 여자아이가 손짓으로 거절하는 모습' },
];
const audioArr = ['/L05/C01/A05/EE4-L05-C01-A05-P10-01.mp3', '/L05/C01/A05/EE4-L05-C01-A05-P10-02.mp3'];

const pageData = { pageNumber: 10, mainKey: 10, getDefaultData, getCorrectData };

const P10 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P10;
