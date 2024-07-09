import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L12/C01/A05/EE4-L12-C01-A05-P06.mp3', captionSrc: '/L12/C01/A05/EE4-L12-C01-A05-P06.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'What do you do \non weekends?',
    interpret: '너는 주말에 무엇을 하니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'I ride my bike.',
    interpret: '나는 자전거를 타.',
  },
];

const imgArr = [
  {
    src: '/L12/C01/A05/EE4-L12-C01-A05-P06.webp',
    alt: '자전거를 떠올리고 있는 남자아이',
  },
];
const audioArr = ['/L12/C01/A05/EE4-L12-C01-A05-P06-01.mp3', '/L12/C01/A05/EE4-L12-C01-A05-P06-02.mp3'];

const pageData = { pageNumber: 6, mainKey: 6, getDefaultData, getCorrectData };

const P06 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P06;
