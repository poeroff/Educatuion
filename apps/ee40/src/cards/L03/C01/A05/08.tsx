import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L03/C01/A05/EE4-L03-C01-A05-P08.mp3', captionSrc: '/L03/C01/A05/EE4-L03-C01-A05-P08.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'Who is she?',
    interpret: '그녀는 누구야?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'She’s my teacher.',
    interpret: '그녀는 나의 선생님이야.',
  },
];

const imgArr = [{ src: '/L03/C01/A05/EE4-L03-C01-A05-P08.webp', alt: '선생님이 교실에서 설명하고 계시는 모습' }];
const audioArr = ['/L03/C01/A05/EE4-L03-C01-A05-P08-01.mp3', '/L03/C01/A05/EE4-L03-C01-A05-P08-02.mp3'];

const pageData = { pageNumber: 8, mainKey: 8, getDefaultData, getCorrectData };

const P08 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P08;
