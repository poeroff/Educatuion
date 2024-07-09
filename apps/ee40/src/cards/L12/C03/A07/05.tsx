import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import EEL01C03A07P02 from '@/Pages/EEL01C03A07P02';
import { getCorrectData, getDefaultData } from './pageData';
import { Card, IImageProps, IPageInfo } from '@/Pages/EEL01C03A07P02';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고 알맞은 문장을 골라 빈칸에 옮기고, 직접 써 봅시다.',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 5,
    mainKey: 5,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [{ text: 'I ride my bike.' }, { text: 'I walk my dog.' }, { text: 'I play the piano.' }, { text: 'I watch movies.' }];

  const imageInfo: IImageProps = {
    src: '/L12/C03/A07/EE4-L12-C03-A07-P05.jpg',
    alt: '피아노를 치는 아이',
    title: '피아노를 치는 아이',
    width: '430px',
    height: '269px',
  };

  return (
    <>
      <EEL01C03A07P02
        headerInfo={headerInfo}
        questionInfo={questionInfo}
        cards={cards}
        imageInfo={imageInfo}
        pageInfo={pageInfo}
        getCorrectData={getCorrectData}
        getDefaultData={getDefaultData}
      />
    </>
  );
};

export default P05;