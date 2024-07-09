import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import EEL02C03A07P02 from '@/Pages/EEL02C03A07P02';
import { getCorrectData, getDefaultData } from './pageData';
import { Card, IImageProps, IPageInfo, Num } from '@/Pages/EEL02C03A07P02';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보며 번호가 가리키는 인물을 소개하는 문장을 골라 빈칸에 옮기고, 직접 써 봅시다.',
    size: 'large',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 5,
    mainKey: 5,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [{ text: 'This is my brother.' }, { text: 'This is my dad.' }, { text: 'This is my mom.' }, { text: 'This is my sister.' }];
  const number: Num = { num: 4 };
  const imageInfo: IImageProps = {
    src: '/L02/C03/A07/EE4-L02-C03-A07-P05.JPG',
    alt: '다섯 가족의 나들이 모습, 돋보기로 무당벌레를 관찰하는 ‘I’라고 쓰여진 남자아이, 돗자리 위에 앉아 도시락을 펼치고 있는 (1) 아빠와 (2) 엄마, 비눗방울을 불고 있는 (3) 여동생, 망원경으로 하늘을 바라보고 있는 (4) 형의 모습',
    title:
      '다섯 가족의 나들이 모습, 돋보기로 무당벌레를 관찰하는 ‘I’라고 쓰여진 남자아이, 돗자리 위에 앉아 도시락을 펼치고 있는 (1) 아빠와 (2) 엄마, 비눗방울을 불고 있는 (3) 여동생, 망원경으로 하늘을 바라보고 있는 (4) 형의 모습',
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

export default P05;
