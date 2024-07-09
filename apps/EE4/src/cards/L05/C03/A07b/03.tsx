// Page: EE4-L01-C01-A06-P02

// pageData
import { getCorrectData, getDefaultData } from './pageData';

// Template

import EE4L06C03A07bP02 from '@/Pages/EE4L06C03A07bP02';

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
      src: '/L05/C03/A07b/EE4-L05-C03-A07b-P03-01.jpg',
      alt: '축구공을 차는 고양이 그림',
    },
    {
      src: '/L05/C03/A07b/EE4-L05-C03-A07b-P03-02.jpg',
      alt: '배드민턴 라켓을 들고 셔틀콕을 치는 고양이 그림',
    },
  ],
  pageNumber: 2,
  mainKey: 0,
  subKey: 'NUMBER-02',
};

const text = "Let's play badmintion";
const P03 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L06C03A07bP02
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

export default P03;
