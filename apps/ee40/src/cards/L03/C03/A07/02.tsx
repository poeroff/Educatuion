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

  const cards: Card[] = [{ text: 'She’s my friend.' }, { text: 'He’s my grandpa.' }, { text: 'She’s my grandma.' }];
  const number: Num = { num: 1 };
  const imageInfo: IImageProps = {
    src: '/L03/C03/A07/EE4-L03-C03-A07-P02.JPG',
    alt: '한글 교실 시 낭송회에서 발표를 하기 위에 앞에 서 계시는 (1) 할머니, 발표를 하고 계시는 (2) 할아버지, 그 발표를 경청하고 있는 ‘I’라고 쓰여진 여자아이와 (3) ‘I‘의 친구 모습',
    title:
      '한글 교실 시 낭송회에서 발표를 하기 위에 앞에 서 계시는 (1) 할머니, 발표를 하고 계시는 (2) 할아버지, 그 발표를 경청하고 있는 ‘I’라고 쓰여진 여자아이와 (3) ‘I‘의 친구 모습',
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
