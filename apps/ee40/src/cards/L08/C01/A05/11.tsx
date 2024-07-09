import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P11 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L08/C01/A05/EE4-L08-C01-A05-P11.mp3', captionSrc: '/L08/C01/A05/EE4-L08-C01-A05-P11.srt' },
};

const data = [
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'How much is it?',
    interpret: '얼마니?',
  },
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'It’s 900 won.',
    interpret: '구백 원이야.',
  },
];

const imgArr = [{ src: '/L08/C01/A05/EE4-L08-C01-A05-P11.webp', alt: '우산과 900원 가격표' }];
const audioArr = ['/L08/C01/A05/EE4-L08-C01-A05-P11-01.mp3', '/L08/C01/A05/EE4-L08-C01-A05-P11-02.mp3'];

const pageData = { pageNumber: 11, mainKey: 11, getDefaultData, getCorrectData };

const P11 = () => {
  return <EEL03C01A05P11 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P11;
