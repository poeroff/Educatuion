import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: {
    audioSrc: '/L03/C01/A05/EE4-L03-C01-A05-P09.mp3',
    captionSrc: '/L03/C01/A05/EE4-L03-C01-A05-P09.srt',
  },
};

const data = [
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'Who is he?',
    interpret: '그는 누구야?',
  },
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'He’s my friend.',
    interpret: '그는 내 친구야.',
  },
];

const imgArr = [{ src: '/L03/C01/A05/EE4-L03-C01-A05-P09.webp', alt: '남자아이가 손을 흔들고 있는 모습' }];
const audioArr = ['/L03/C01/A05/EE4-L03-C01-A05-P09-01.mp3', '/L03/C01/A05/EE4-L03-C01-A05-P09-02.mp3'];

const pageData = { pageNumber: 9, mainKey: 9, getDefaultData, getCorrectData };

const P09 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P09;
