import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';

import { Card } from '@/Pages/EE4L04C03A07bP04';
import EE4L04C03A07bP04 from '@/Pages/EE4L04C03A07bP04';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 보고 노트에 직접 써 봅시다',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [
    { text: "Don't enter, please" },
    { text: "Don't run, please" },
    { text: "Don't push, please" },
    { text: "Don't talk, please" },
  ];

  const imageInfo: IImageProps = {
    src: '/L01/C03/A07/EE4-L01-C03-A07-P03.png',
    alt: '운동장에서 축구공을 손에 든 여자아이와 반갑게 손 흔들며 인사하는 남자. 오후 한시를 가리키는 시계.',
    title: '운동장에서 축구공을 손에 든 여자아이와 반갑게 손 흔들며 인사하는 남자. 오후 한시를 가리키는 시계.',
    width: '430px',
    height: '269px',
  };

  return (
    <EE4L04C03A07bP04
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      cards={cards}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P04;
