import { getCorrectData, getDefaultData } from './pageData';

import EE4L06C02A05a from '@/Pages/EE4L06C02A05a';

import { PageProps } from '.';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Think and Talk',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '그림을 보고, 친구들이 무엇을 하고 있는지 나타내는 말을 해 봅시다.',
  },

  headImage: '/L01/C01/A06/EE4-L01-C01-A06-P02.jpg',
  list: [
    {
      src: '/L06/C02/A05a/EE4-L06-C02-A05a-P01-01.jpg',
      alt: '헤드셋을 끼고 음악을 듣고 있는 남자아이',
    },
    {
      src: '/L06/C02/A05a/EE4-L06-C02-A05a-P01-02.jpg',
      alt: '책을 읽고 있는 여자아이',
    },
    {
      src: '/L06/C02/A05a/EE4-L06-C02-A05a-P01-03.jpg',
      alt: '색연필로 그림을 그리고 있는 남자아이',
    },
  ],
  pageNumber: 1,
  mainKey: 1,
  subKey: 'RECORDER-1',
};

const P01 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L06C02A05a
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

export default P01;
