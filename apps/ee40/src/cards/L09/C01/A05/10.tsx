import { getDefaultData, getCorrectData } from './pageData';

import EEL03C01A05P06 from '@/Pages/EEL03C01A05P06';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
  audioInfo: { audioSrc: '/L09/C01/A05/EE4-L09-C01-A05-P10.mp3', captionSrc: '/L09/C01/A05/EE4-L09-C01-A05-P10.srt' },
};

const data = [
  {
    type: 'G',
    color: '#E2F2FF',
    content: 'Where is my \nbook?',
    interpret: '내 책이 어디 있지?',
  },
  {
    type: 'B',
    color: '#FFF0CC',
    content: 'It’s on the table.',
    interpret: '탁자 위에 있어.',
  },
];

const imgArr = [
  {
    src: '/L09/C01/A05/EE4-L09-C01-A05-P06.png',
    alt: '방 양 끝에 여자아이와 남자아이가 있고, 의자 아래에는 모자, 바구니 안에는 붓, 상자 안에는 자, 침대 위에는 손목시계, 탁자 위에는 책, 책상 아래에는 공이 있는 모습',
  },
];
const audioArr = ['/L09/C01/A05/EE4-L09-C01-A05-P10-01.mp3', '/L09/C01/A05/EE4-L09-C01-A05-P10-02.mp3'];

const pageData = { pageNumber: 10, mainKey: 10, getDefaultData, getCorrectData };

const P10 = () => {
  return <EEL03C01A05P06 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P10;
