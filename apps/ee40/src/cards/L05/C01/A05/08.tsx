import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L05/C01/A05/EE4-L05-C01-A05-P08.mp3', captionSrc: '/L05/C01/A05/EE4-L05-C01-A05-P08.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'Let’s play \nbadminton.',
    interpret: '우리 배드민턴을 하자.',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'Sure.',
    interpret: '물론이지.',
  },
];

const imgArr = [
  { src: '/L05/C01/A05/EE4-L05-C01-A05-P07-01.webp', alt: '남자아이가 활짝 웃고 있는 모습' },
  { src: '/L05/C01/A05/EE4-L05-C01-A05-P08-01.webp', alt: '여자아이가 배드민턴 라켓과 셔틀콕을 들고 있는 모습' },
];
const audioArr = ['/L05/C01/A05/EE4-L05-C01-A05-P08-01.mp3', '/L05/C01/A05/EE4-L05-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;
