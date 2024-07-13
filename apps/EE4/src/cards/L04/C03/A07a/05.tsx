import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';
import EE4L04C03A07a from '@/Pages/EE4L04C03A07a';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 알맞은 문장을 <보기>에서 골라 쓰고 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L04/C03/A07a/EE4-L04-C03-A07a-P05.jpg',
    alt: '말풍선이 있고, 그 위에 금지 표시가 있는 표지판',
    title: '말풍선이 있고, 그 위에 금지 표시가 있는 표지판',
    width: '455px',
    height: '234px',
    imgNum: 1,
  };

  const pageInfo: IPageInfo = {
    pageNum: 5,
    mainKey: 5,
    subKey: 'TEXT-1',
  };

  const data: IData[] = [
    { text: "Don't eat, please" },
    { text: "Don't run, please" },
    { text: "Don't talk, please" },
    { text: "Don't push, please" },
    { text: "Don't enter, please" },
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

export default P05;
