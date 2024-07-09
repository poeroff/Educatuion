// Page: EE4-L01-C01-A06-P02

// pageData
import { getCorrectData, getDefaultData } from './pageData';

// Template

import EE4L06C03A07bP02 from '@/Pages/EE4L06C03A07bP02';

import { PageProps, listData } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Words and Sentences 3',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '문장을 보고 알맞은 그림을 고른 후, 문장을 직접 써 봅시다',
  },
  audioInfo: {
    audioSrc: '/L01/C01/A06/EE4-L01-C01-A06-P02.mp3',
  },
  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L06/C03/A07b/EE4-L06-C03-A07b-P04-01.jpg',
      alt: '청소하는 외계인 친구',
    },
    {
      src: '/L06/C03/A07b/EE4-L06-C03-A07b-P04-02.jpg',
      alt: '요리하는 외계인 친구',
    },
  ],
  pageNumber: 2,
  mainKey: 0,
  subKey: 'NUMBER-02',
};

const text = "I'm cooking";
const P04 = () => {
  const { headerInfo, questionInfo, audioInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L06C03A07bP02
      textObj={text}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      headImage={headImage}
      pageNumber={pageNumber}
      mainKey={mainKey}
      subKey={subKey}
      pageData={list}
    />
  );
};

export default P04;
