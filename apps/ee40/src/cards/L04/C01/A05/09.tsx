import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L04/C01/A05/EE4-L04-C01-A05-P09.mp3', captionSrc: '/L04/C01/A05/EE4-L04-C01-A05-P09.srt' },
};

const data = [
  {
    type: 'W',
    color: '#E2F2FF',
    content: 'Don’t run, please.',
    interpret: '달리지 말아 줘.',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'Okay.',
    interpret: '알겠어요.',
  },
];

const imgArr = [
  {
    src: '/L04/C01/A05/EE4-L04-C01-A05-P07.png',
    alt: '미술관에서 친구를 미는 남자아이, 음식을 먹는 남자아이, 뛰는 여자아이, 떠들고 있는 남자아이들, 직원 공간에 들어가려고 하는 여자아이, 그리고 그들을 제지하는 선생님의 모습',
  },
];
const audioArr = ['/L04/C01/A05/EE4-L04-C01-A05-P09-01.mp3', '/L04/C01/A05/EE4-L04-C01-A05-P09-02.mp3'];

const pageData = { pageNumber: 9, mainKey: 9, getDefaultData, getCorrectData };

const P09 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P09;
