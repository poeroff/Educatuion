import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L06/C01/A05/EE4-L06-C01-A05-P06.mp3', captionSrc: '/L06/C01/A05/EE4-L06-C01-A05-P06.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'What are you \ndoing?',
    interpret: '무엇을 하고 있니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'I’m cleaning',
    interpret: '나는 청소하고 있어.',
  },
];

const imgArr = [{ src: '/L06/C01/A05/EE4-L06-C01-A05-P06.webp', alt: '남자아이가 청소하고 있는 모습' }];
const audioArr = ['/L06/C01/A05/EE4-L06-C01-A05-P06-01.mp3', '/L06/C01/A05/EE4-L06-C01-A05-P06-02.mp3'];

const pageData = { pageNumber: 6, mainKey: 6, getDefaultData, getCorrectData };

const P06 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P06;
