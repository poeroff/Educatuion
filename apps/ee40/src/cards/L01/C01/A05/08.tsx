import { getDefaultData, getCorrectData } from './pageData';

import EEL01C01A05P07 from '@/Pages/EEL01C01A05P07';

const layout = {
  headerInfo: { headerText: 'Stroy1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '대화를 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L01/C01/A05/EE4-L01-C01-A05-P08.mp3' },
};

const data = [
  {
    type: 'A',
    color: '#E2F2FF',
    content: <>How are you?</>,
    interpret: <>기분이 어때?</>,
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: <>Not so good.</>,
    interpret: <>좋지 않아.</>,
  },
];

const imgArr = [{ src: '/L01/C01/A05/EE4-L01-C01-A05-P07.png', alt: '교실에서 아이들이 서로 인사하고 있는 모습' }];
const audioArr = ['/L01/C01/A05/EE4-L01-C01-A05-P08-01.mp3', '/L01/C01/A05/EE4-L01-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL01C01A05P07 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;
