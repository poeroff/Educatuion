import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L12/C01/A05/EE4-L12-C01-A05-P11.mp3', captionSrc: '/L12/C01/A05/EE4-L12-C01-A05-P11.srt' },
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
    content: 'I play soccer.',
    interpret: '나는 축구를 해.',
  },
];

const imgArr = [
  {
    src: '/L12/C01/A05/EE4-L12-C01-A05-P11.webp',
    alt: '축구공을 떠올리고 있는 여자아이',
  },
];
const audioArr = ['/L12/C01/A05/EE4-L12-C01-A05-P11-01.mp3', '/L12/C01/A05/EE4-L12-C01-A05-P11-02.mp3'];

const pageData = { pageNumber: 11, mainKey: 11, getDefaultData, getCorrectData };

const P11 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P11;
