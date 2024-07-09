// Page: EE4-L01-C01-A06-P02

// pageData
import { getCorrectData, getDefaultData } from './pageData';

// Template
import EE4L04C01A06aP01 from '@/Pages/EE4L04C01A06aP01';

import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '잘 듣고, 금지하는 말과 어울리는 그림을 골라 봅시다',
  },
  audioInfo: {
    audioSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P01.mp3',
    captionSrc: '/L04/C01/A06a/EE4-L04-C01-A06a-P01.srt',
  },
  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P01-01.jpg',
      alt: '음식을 먹는 것을 금지하는 표지판',
    },
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P01-02.jpg',
      alt: '사람이 어느 장소에 들어가는 것을 금지하는 표지판',
    },
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P01-03.jpg',
      alt: '사람이 벽을 미는 것을 금지하는 표지판',
    },

    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P01-04.jpg',
      alt: '사람이 달리는 것을 금지하는 표지판',
    },

    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P01-05.jpg',
      alt: '사람이 말하는 것을 금지하는 표지판',
    },
  ],
  pageNumber: 1,
  mainKey: 0,
  subKey: 'TEXT-01',
};

const P01 = () => {
  const { headerInfo, questionInfo, audioInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L04C01A06aP01
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

export default P01;
