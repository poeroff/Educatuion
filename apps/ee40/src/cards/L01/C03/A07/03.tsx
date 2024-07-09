import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import EEL01C03A07P02, { Card, IImageProps, IPageInfo } from '@/Pages/EEL01C03A07P02';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A07/pageData';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고 알맞은 문장을 골라 빈칸에 옮기고, 직접 써 봅시다.',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [{ text: 'Good afternoon.' }, { text: 'Good morning.' }, { text: 'Good evening.' }];

  const imageInfo: IImageProps = {
    src: '/L01/C03/A07/EE4-L01-C03-A07-P03.png',
    alt: '운동장에서 축구공을 손에 든 여자아이와 반갑게 손 흔들며 인사하는 남자. 오후 한시를 가리키는 시계.',
    title: '운동장에서 축구공을 손에 든 여자아이와 반갑게 손 흔들며 인사하는 남자. 오후 한시를 가리키는 시계.',
    width: '430px',
    height: '269px',
  };

  return (
    <EEL01C03A07P02
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

export default P03;
