import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P08 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L07/C01/A05/EE4-L07-C01-A05-P08.mp3', captionSrc: '/L07/C01/A05/EE4-L07-C01-A05-P08.srt' },
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
    content: 'It’s 4:30.',
    interpret: '4시 30분이야.',
  },
];

const imgArr = [{ src: '/L07/C01/A05/EE4-L07-C01-A05-P08.webp', alt: '숫자로 4시 30분을 나타내는 시계' }];
const audioArr = ['/L07/C01/A05/EE4-L07-C01-A05-P08-01.mp3', '/L07/C01/A05/EE4-L07-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL03C01A05P08 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;
