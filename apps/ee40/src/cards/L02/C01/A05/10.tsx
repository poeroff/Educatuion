import { getDefaultData, getCorrectData } from './pageData';

import EEL01C01A05P07 from '@/Pages/EEL01C01A05P07';

const layout = {
  headerInfo: { headerText: 'Story 1_Practice', headerPattern: 'text' as const },
  questionInfo: { text: '문장을 듣고, 따라 말해 봅시다.' },
};

const data = [
  {
    type: 'B',
    color: '#E2F2FF',
    content: <>This is my sister.</>,
    interpret: <>이 아이는 우리 여동생이야.</>,
  },
];

const imgArr = [{ src: '/L02/C01/A05/EE4-L02-C01-A05-P07.png', alt: '남자아이가 아빠, 엄마, 형, 여동생과 함께 찍은 가족 사진을 소개하는 모습' }];
const audioArr = ['/L02/C01/A05/EE4-L02-C01-A05-P10.mp3'];

const pageData = { pageNumber: 10, mainKey: 10, getDefaultData, getCorrectData };

const P10 = () => {
  return <EEL01C01A05P07 layout={layout} imgArr={imgArr} audioArr={audioArr} data={data} pageData={pageData} />;
};

export default P10;
