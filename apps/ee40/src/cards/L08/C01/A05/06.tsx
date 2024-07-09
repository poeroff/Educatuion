import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L08/C01/A05/EE4-L08-C01-A05-P06.mp3', captionSrc: '/L08/C01/A05/EE4-L08-C01-A05-P06.srt' },
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
    content: 'It’s 800 won.',
    interpret: '팔백 원이야.',
  },
];

const imgArr = [{ src: '/L08/C01/A05/EE4-L08-C01-A05-P06.webp', alt: '인형과 800원 가격표' }];
const audioArr = ['/L08/C01/A05/EE4-L08-C01-A05-P06-01.mp3', '/L08/C01/A05/EE4-L08-C01-A05-P06-02.mp3'];

const pageData = { pageNumber: 6, mainKey: 6, getDefaultData, getCorrectData };

const P06 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P06;
