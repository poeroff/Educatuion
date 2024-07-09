// Page: EE4-L01-C01-A06-P02

// pageData
import { getCorrectData, getDefaultData } from './pageData';

// Template

import EE4L05C03A07bP02 from '@/Pages/EE4L05C03A07b/P02_P04';

import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '잘 듣고, 금지하는 말과 어울리는 그림을 골라 봅시다.',
  },

  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
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
  mainKey: 0,
  subKey: 'NUMBER-02',
};

const text = "Let'play baseball.";

const P02 = () => {
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

export default P02;
