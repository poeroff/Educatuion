import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L07/C01/A05/EE4-L07-C01-A05-P07.mp3', captionSrc: '/L07/C01/A05/EE4-L07-C01-A05-P07.srt' },
};

const data = [
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'What time is it?',
    interpret: '몇 시니?',
  },
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'It’s 2 o’clock.',
    interpret: '2시야.',
  },
];

const imgArr = [{ src: '/L07/C01/A05/EE4-L07-C01-A05-P07.webp', alt: ' 시침이 2를 가리키고 있고, 분침이 12를 가리키고 있는 시계' }];
const audioArr = ['/L07/C01/A05/EE4-L07-C01-A05-P07-01.mp3', '/L07/C01/A05/EE4-L07-C01-A05-P07-02.mp3'];

const pageData = { pageNumber: 7, mainKey: 7, getDefaultData, getCorrectData };

const P07 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P07;
