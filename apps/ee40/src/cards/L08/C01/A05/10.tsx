import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P10 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L08/C01/A05/EE4-L08-C01-A05-P10.mp3', captionSrc: '/L08/C01/A05/EE4-L08-C01-A05-P10.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'How much is it?',
    interpret: '얼마니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'It’s 5,000 won.',
    interpret: '오천 원이야.',
  },
];

const imgArr = [{ src: '/L08/C01/A05/EE4-L08-C01-A05-P10.webp', alt: '시계와 5,000원 가격표' }];
const audioArr = ['/L08/C01/A05/EE4-L08-C01-A05-P10-01.mp3', '/L08/C01/A05/EE4-L08-C01-A05-P10-02.mp3'];

const pageData = { pageNumber: 10, mainKey: 10, getDefaultData, getCorrectData };

const P10 = () => {
  return <EEL03C01A05P10 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P10;
