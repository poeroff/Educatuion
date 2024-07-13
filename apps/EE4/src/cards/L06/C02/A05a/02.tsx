import { getCorrectData, getDefaultData } from './pageData';

import EE4L06C02A05aP02 from '@/Pages/EE4L06C02A05aP02';

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
      src: '/L06/C02/A05a/EE4-L06-C02-A05a-P02-01.jpg',
      alt: '앞치마를 매고 요리하고 있는 남자아이',
    },
    {
      src: '/L06/C02/A05a/EE4-L06-C02-A05a-P02-02.jpg',
      alt: '청소기를 들고 청소하고 있는 여자아이',
    },
    {
      src: '/L06/C02/A05a/EE4-L06-C02-A05a-P02-03.jpg',
      alt: '로봇을 만들고 있는 여자아이',
    },
  ],
  pageNumber: 2,
  mainKey: 2,
  subKey: 'RECORDER-1',
};

const P02 = () => {
  const { headerInfo, questionInfo, headImage, list, pageNumber, mainKey, subKey } = pageInfo;

  return (
    <EE4L06C02A05aP02
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
