import { getCorrectData, getDefaultData } from './pageData';
import EE4L04C01A06bP01 from '@/Pages/EE4L04C01A06bP01';
import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '잘 듣고, 금지하는 말과 어울리는 그림을 골라 봅시다.',
  },
  audioInfo: {
    audioSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P02.mp3',
    captionSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P02.srt',
  },

  list: [
    {
      src: '/L04/C01/A06b/EE4-L04-C01-A06b-P02-01.jpg',
      alt: '잔디밭에서 들어가려고 하는 남자아이',
    },
    {
      src: '/L04/C01/A06b/EE4-L04-C01-A06b-P02-02.jpg',
      alt: '도서관에서 떠들고 있는 여자아이와 남자아이',
    },
  ],
  pageNumber: 2,
  mainKey: 2,
  subKey: 'NUMBER-1',
};

const P02 = () => {
  const { headerInfo, questionInfo, audioInfo, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L04C01A06bP01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      pageNumber={pageNumber}
      mainKey={mainKey}
      subKey={subKey}
      pageData={list}
    />
  );
};

export default P02;
