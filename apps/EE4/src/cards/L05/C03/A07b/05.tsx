// Page: EE4-L01-C01-A06-P02

// pageData
import { getCorrectData, getDefaultData } from './pageData';

// Template

import EE4L05C03A07bP02 from '@/Pages/P02_P04';

import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Words and Sentences 3',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '문장을 읽고 알맞은 그림을 고른 후, 문장을 직접 써 봅시다',
  },

  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L05/C03/A07b/EE4-L05-C03-A07b-P05-01.jpg',
      alt: '축구공을 차는 고양이 그림',
    },
    {
      src: '/L05/C03/A07b/EE4-L05-C03-A07b-P05-02.jpg',
      alt: '야구 방망이로 야구공을 치려고 하는 고양이 그림',
    },
  ],
  pageNumber: 5,
  mainKey: 5,
  subKey: 'NUMBER-1',
};

const text = "Let's play soccer";
const P05 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L05C03A07bP02
      textObj={text}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
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

export default P05;
