import { getCorrectData, getDefaultData } from './pageData';
import EE4L04C01A06aP02 from '@/Pages/EE4L04C01A06aP02';
import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '잘 듣고, 금지하는 말과 어울리는 그림을 골라 봅시다',
  },

  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P02-01.jpg',
      alt: '사람이 달리는 것을 금지하는 표지판',
    },
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P02-02.jpg',
      alt: '사람이 말하는 것을 금지하는 표지판',
    },
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P02-03.jpg',
      alt: '음식을 먹는 것을 금지하는 표지판',
    },
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P02-04.jpg',
      alt: '사람이 어느 장소에 들어가는 것을 금지하는 표지판',
    },
    {
      src: '/L04/C01/A06a/EE4-L04-C01-A06a-P02-05.jpg',
      alt: '사람이 벽을 미는 것을 금지하는 표지판',
    },
  ],
  pageNumber: 1,
  mainKey: 0,
  subKey: 'NUMBER-01',
};

const P02 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L04C01A06aP02
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
