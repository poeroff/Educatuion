import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';
import EE4L04C03A07a from '@/Pages/EE4L04C03A07a';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 3',
  };

  const questionInfo: IQuestionProps = {
    text: '사진과 일치하는 낱말을 <보기> 에서 골라 쓰고 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C03/A07a/EE4-L05-C03-A07a-P03.jpg',
    alt: '배드민턴 라켓을 들고 셔틀콕을 치는 고양이 그림',
    title: '배드민턴 라켓을 들고 셔틀콕을 치는 고양이 그림',
    width: '455px',
    height: '234px',
    imgNum: 1,
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [
    { text: "Let's play basketball" },
    { text: "Let's play badminton" },
    { text: "Let's play baseball" },
    { text: "Let's play soccer" },
  ];

  return (
    <EE4L04C03A07a
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P03;