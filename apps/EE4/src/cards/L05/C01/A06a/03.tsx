import { getCorrectData, getDefaultData } from './pageData';
import EE4L05C01A06aP03 from '@/Pages/EE4L05C01A06aP03';
import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '사진을 보고, 사진 속 운동을 제안하는 말을 해 봅시다.',
  },

  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L05/C01/A06a/EE4-L05-C01-A06a-P03-01.jpg',
      alt: '농구 하는 아이들',
    },
    {
      src: '/L05/C01/A06a/EE4-L05-C01-A06a-P03-02.jpg',
      alt: '배드민턴을 하는 아이',
    },
    {
      src: '/L05/C01/A06a/EE4-L05-C01-A06a-P03-03.jpg',
      alt: '야구 하는 아이들',
    },
  ],
  pageNumber: 3,
  mainKey: 3,
  subKey: 'NUMBER-01',
};

const P03 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L05C01A06aP03
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
