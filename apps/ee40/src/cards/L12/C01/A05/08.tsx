import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L12/C01/A05/EE4-L12-C01-A05-P08.mp3', captionSrc: '/L12/C01/A05/EE4-L12-C01-A05-P08.srt' },
};

const data = [
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'What do you do \non weekends?',
    interpret: '너는 주말에 무엇을 하니?',
  },
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'I walk my dog.',
    interpret: '나는 나의 강아지를 산책시켜.',
  },
];

const imgArr = [
  {
    src: '/L12/C01/A05/EE4-L12-C01-A05-P08.webp',
    alt: '강아지와 산책하는 모습을 떠올리고 있는 여자아이',
  },
];
const audioArr = ['/L12/C01/A05/EE4-L12-C01-A05-P08-01.mp3', '/L12/C01/A05/EE4-L12-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;
