import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import EEL02C03A07P02 from '@/Pages/EEL02C03A07P02';
import { getCorrectData, getDefaultData } from './pageData';
import { Card, IImageProps, IPageInfo, Num } from '@/Pages/EEL02C03A07P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보며 번호가 가리키는 인물을 소개하는 문장을 골라 빈칸에 옮기고, 직접 써 봅시다.',
    size: 'large',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'TEXT-02',
  };

  const cards: Card[] = [{ text: 'It’s under the bed.' }, { text: 'It’s in the box.' }, { text: 'It’s on the desk.' }];
  const number: Num = { num: 1 };
  const imageInfo: IImageProps = {
    src: '/L09/C03/A07/EE4-L09-C03-A07-P02.JPG',
    alt: '방에 (1) 책상 위에 책이 놓여 있는 모습, (2) 상자 안에 공이 놓여 있는 모습, (3) 침대 아래에 붓이 있는 모습',
    title: '방에 (1) 책상 위에 책이 놓여 있는 모습, (2) 상자 안에 공이 놓여 있는 모습, (3) 침대 아래에 붓이 있는 모습',
    width: '430px',
    height: '269px',
  };

  return (
    <EEL02C03A07P02
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      cards={cards}
      number={number}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P02;
