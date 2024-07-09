import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P10 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L07/C01/A05/EE4-L07-C01-A05-P10.mp3', captionSrc: '/L07/C01/A05/EE4-L07-C01-A05-P10.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'What time is it?',
    interpret: '몇 시니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'It’s 7:30.',
    interpret: '7시 30분이야.',
  },
];

const imgArr = [{ src: '/L07/C01/A05/EE4-L07-C01-A05-P10.webp', alt: '숫자로 7시 30분을 나타내는 시계' }];
const audioArr = ['/L07/C01/A05/EE4-L07-C01-A05-P10-01.mp3', '/L07/C01/A05/EE4-L07-C01-A05-P10-02.mp3'];

const pageData = { pageNumber: 10, mainKey: 10, getDefaultData, getCorrectData };

const P10 = () => {
  return <EEL03C01A05P10 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P10;
