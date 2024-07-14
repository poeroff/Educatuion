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

  list: [
    {
      src: '/L05/C03/A07b/EE4-L05-C03-A07b-P02-01.jpg',
      alt: '야구 방망이로 야구공을 치려고 하는 고양이 그림',
    },
    {
      src: '/L05/C03/A07b/EE4-L05-C03-A07b-P02-02.jpg',
      alt: '농구공을 손가락으로 돌리고 있는 고양이 그림',
    },
  ],
  pageNumber: 2,
  mainKey: 2,
  subKey: 'NUMBER-1',
};

const text = "Let'play baseball.";

const P02 = () => {
  const { headerInfo, questionInfo, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L05C03A07bP02
      textObj={text}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
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
