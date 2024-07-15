import { getCorrectData, getDefaultData } from './pageData';
import EE4L04C01A06bP01 from '@/Pages/EE4L04C01A06bP01';
import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '1.잘 듣고, 금지하는 말과 어울리는 그림을 골라 봅시다',
  },
  audioInfo: {
    audioSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P01.mp3',
    captionSrc: '/L04/C01/A06b/EE4-L04-C01-A06b-P01.srt',
  },

  list: [
    {
      src: '/L04/C01/A06b/EE4-L04-C01-A06b-P01-01.jpg',
      alt: '복도에서 뛰고 있는 남자 아이 ',
    },
    {
      src: '/L04/C01/A06b/EE4-L04-C01-A06b-P01-02.jpg',
      alt: '지하철에서 빵을 먹고 있는 여자아이',
    },
  ],
  pageNumber: 1,
  mainKey: 1,
  subKey: 'NUMBER-1',
};

const P01 = () => {
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

export default P01;
