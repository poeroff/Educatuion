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
    text: '그림을 보며 번호가 가리키는 인물이 자신의 복장에 대해 할 말을 골라 빈칸에 옮기고, 직접 써 봅시다.',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 5,
    mainKey: 5,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [{ text: 'My dress is red.' }, { text: 'My coat is short.' }, { text: 'My cap is blue.' }, { text: 'My scarf is long.' }];

  const imageInfo: IImageProps = {
    src: '/L10/C03/A07/EE4-L10-C03-A07-P05.JPG',
    alt: '네 명의 아이들이 있는 우주, (1) 긴 스카프를 매고 있는 남자아이, (2) 파란색 모자를 쓰고 있는 남자아이, (3) 짧은 코트를 입고 있는 여자아이, (4) 빨간색 드레스를 입고 있는 여자아이의 모습',
    title:
      '네 명의 아이들이 있는 우주, (1) 긴 스카프를 매고 있는 남자아이, (2) 파란색 모자를 쓰고 있는 남자아이, (3) 짧은 코트를 입고 있는 여자아이, (4) 빨간색 드레스를 입고 있는 여자아이의 모습',
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
