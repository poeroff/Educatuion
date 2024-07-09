import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L03/C01/A05/EE4-L03-C01-A05-P07.mp3', captionSrc: '/L03/C01/A05/EE4-L03-C01-A05-P07.srt' },
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
    content: 'He’s my \ngrandpa.',
    interpret: '그는 나의 할아버지야.',
  },
];

const imgArr = [{ src: '/L03/C01/A05/EE4-L03-C01-A05-P07.webp', alt: '할아버지가 벤치에 앉아 계시는 모습' }];
const audioArr = ['/L03/C01/A05/EE4-L03-C01-A05-P07-01.mp3', '/L03/C01/A05/EE4-L03-C01-A05-P07-02.mp3'];

const pageData = { pageNumber: 7, mainKey: 7, getDefaultData, getCorrectData };

const P07 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P07;
