import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';
import EE4L05C03A07a from '@/Pages/EE4L04C03A07a';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'World and Sentences',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 알맞은 문장을 <보기>에서 골라 쓰고 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C03/A07a/EE4-L05-C03-A07a-P04.jpg',
    alt: '축구공을 차는 고양이 그림',
    title: '축구공을 차는 고양이 그림',
    width: '455px',
    height: '234px',
    imgNum: 1,
  };

  const pageInfo: IPageInfo = {
    pageNum: 4,
    mainKey: 4,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [
    { text: "Let's play basketball" },
    { text: "Let's play badminton" },
    { text: "Let's play baseball" },
    { text: "Let's play soccer" },
  ];

  return (
    <EE4L05C03A07a
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

export default P04;
