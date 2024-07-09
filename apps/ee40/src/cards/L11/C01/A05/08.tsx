import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L11/C01/A05/EE4-L11-C01-A05-P08.mp3', captionSrc: '/L11/C01/A05/EE4-L11-C01-A05-P08.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'What day is it \ntoday?',
    interpret: '오늘 무슨 요일이니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'It’s Tuesday.',
    interpret: '화요일이야.',
  },
];

const imgArr = [
  {
    src: '/L11/C01/A05/EE4-L11-C01-A05-P07.png',
    alt: '여자아이가 달력 앞에서 요일을 가리키고 있고, 남자아이가 그 앞에서 대답하고 있는 모습',
  },
];
const audioArr = ['/L11/C01/A05/EE4-L11-C01-A05-P08-01.mp3', '/L11/C01/A05/EE4-L11-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;
