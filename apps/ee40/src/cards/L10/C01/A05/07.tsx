import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L10/C01/A05/EE4-L10-C01-A05-P07.mp3', captionSrc: '/L10/C01/A05/EE4-L10-C01-A05-P07.srt' },
};

const data = [
  {
    type: 'M',
    color: '#E2F2FF',
    content: 'Is this your shirt?',
    interpret: '이게 네 셔츠니?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'Yes, it is.',
    interpret: '네, 맞아요.',
  },
];

const imgArr = [
  {
    src: '/L10/C01/A05/EE4-L10-C01-A05-P06.png',
    alt: '분실물 보관소에 남자 직원과 남자아이, 여자아이가 있고, 분실물은 스카프, 셔츠, 신발, 드레스, 치마, 코트, 모자가 있는 모습',
  },
];
const audioArr = ['/L10/C01/A05/EE4-L10-C01-A05-P07-01.mp3', '/L10/C01/A05/EE4-L10-C01-A05-P07-02.mp3'];

const pageData = { pageNumber: 7, mainKey: 7, getDefaultData, getCorrectData };

const P07 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P07;
