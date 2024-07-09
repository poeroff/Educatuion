import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L10/C01/A05/EE4-L10-C01-A05-P09.mp3', captionSrc: '/L10/C01/A05/EE4-L10-C01-A05-P09.srt' },
};

const data = [
  {
    type: 'M',
    color: '#E2F2FF',
    content: 'Is this your \ndress?',
    interpret: '이게 네 드레스니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'No, it isn’t.',
    interpret: '아니요, 그렇지 않아요.',
  },
];

const imgArr = [
  {
    src: '/L10/C01/A05/EE4-L10-C01-A05-P06.png',
    alt: '분실물 보관소에 남자 직원과 남자아이, 여자아이가 있고, 분실물은 스카프, 셔츠, 신발, 드레스, 치마, 코트, 모자가 있는 모습',
  },
];
const audioArr = ['/L10/C01/A05/EE4-L10-C01-A05-P09-01.mp3', '/L10/C01/A05/EE4-L10-C01-A05-P09-02.mp3'];

const pageData = { pageNumber: 9, mainKey: 9, getDefaultData, getCorrectData };

const P09 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P09;
