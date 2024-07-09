import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import EEL01C03A07P02 from '@/Pages/EEL01C03A07P02';
import { getCorrectData, getDefaultData } from './pageData';
import { Card, IImageProps, IPageInfo } from '@/Pages/EEL01C03A07P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고 알맞은 문장을 골라 빈칸에 옮기고, 직접 써 봅시다.',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [
    { text: 'Don’t enter, please.' },
    { text: 'Don’t push, please.' },
    { text: 'Don’t run, please.' },
    { text: 'Don’t talk, please.' },
  ];

  const imageInfo: IImageProps = {
    src: '/L04/C03/A07/EE4-L04-C03-A07-P02.JPG',
    alt: '계단을 위험하게 뛰어 내려가는 여자아이의 모습과 금지 표시',
    title: '계단을 위험하게 뛰어 내려가는 여자아이의 모습과 금지 표시',
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

export default P02;
