import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L06/C01/A05/EE4-L06-C01-A05-P11.mp3', captionSrc: '/L06/C01/A05/EE4-L06-C01-A05-P11.srt' },
};

const data = [
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'What are you \ndoing?',
    interpret: '무엇을 하고 있니?',
  },
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'I’m reading a \nbook.',
    interpret: '나는 책을 읽고 있어.',
  },
];

const imgArr = [{ src: '/L06/C01/A05/EE4-L06-C01-A05-P11.webp', alt: '여자아이가 책을 읽고 있는 모습' }];
const audioArr = ['/L06/C01/A05/EE4-L06-C01-A05-P11-01.mp3', '/L06/C01/A05/EE4-L06-C01-A05-P11-02.mp3'];

const pageData = { pageNumber: 11, mainKey: 11, getDefaultData, getCorrectData };

const P11 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P11;
