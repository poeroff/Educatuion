import { PageProps } from '../../C02/A05a';
import { getCorrectData, getDefaultData } from './pageData';
import EE4L06C01A06aP02 from '@/Pages/EE4L06C01A06aP02';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Listen and Do',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '그림을 보고, 그림 속 친구들이 되어 무엇을 하고 있는지 말 해 봅시다.',
  },

  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L06/C01/A06a/EE4-L06-C01-A06a-P02-01.jpg',
      alt: '요리하고 있는 여자아이',
    },
    {
      src: '/L06/C01/A06a/EE4-L06-C01-A06a-P02-02.jpg',
      alt: '음악을 듣고 있는 남자아이',
    },
    {
      src: '/L06/C01/A06a/EE4-L06-C01-A06a-P02-03.jpg',
      alt: '책을 읽고 있는 여자아이',
    },
    {
      src: '/L06/C01/A06a/EE4-L06-C01-A06a-P02-04.jpg',
      alt: '그림을 그리고 있는 남자아이',
    },
  ],
  pageNumber: 2,
  mainKey: 2,
  subKey: 'RECORDER-1',
};

const P02 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L06C01A06aP02
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
