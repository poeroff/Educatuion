import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P08 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L08/C01/A05/EE4-L08-C01-A05-P08.mp3', captionSrc: '/L08/C01/A05/EE4-L08-C01-A05-P08.srt' },
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
    content: 'It’s 6,000 won.',
    interpret: '육천 원이야.',
  },
];

const imgArr = [{ src: '/L08/C01/A05/EE4-L08-C01-A05-P08.webp', alt: '야구 글러브와 6,000원 가격표' }];
const audioArr = ['/L08/C01/A05/EE4-L08-C01-A05-P08-01.mp3', '/L08/C01/A05/EE4-L08-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL03C01A05P08 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;