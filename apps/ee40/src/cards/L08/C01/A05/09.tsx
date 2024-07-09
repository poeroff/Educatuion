import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L08/C01/A05/EE4-L08-C01-A05-P09.mp3', captionSrc: '/L08/C01/A05/EE4-L08-C01-A05-P09.srt' },
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
    content: 'It’s 400 won.',
    interpret: '사백 원이야.',
  },
];

const imgArr = [{ src: '/L08/C01/A05/EE4-L08-C01-A05-P09.webp', alt: '배 장난감과 400원 가격표' }];
const audioArr = ['/L08/C01/A05/EE4-L08-C01-A05-P09-01.mp3', '/L08/C01/A05/EE4-L08-C01-A05-P09-02.mp3'];

const pageData = { pageNumber: 9, mainKey: 9, getDefaultData, getCorrectData };

const P09 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P09;
