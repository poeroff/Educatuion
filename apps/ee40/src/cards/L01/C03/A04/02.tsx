import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A04/pageData';
import EEL01C03A04P02, { IImageProps, HighlightProps, IPageInfo } from '@/Pages/EEL01C03A04P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds and Letters 3',
  };

  const questionInfo: IQuestionProps = {
    text: 'a의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C03/A04/EE4-L01-C03-A04-P02.JPG',
    title: '왼쪽에는 고양이가 사과모양 모자를 유심히 들여다보고 있는 모습, 오른쪽에는 고양이가 사과 모양 모자를 쓰고 있는 모습',
    alt: '왼쪽에는 고양이가 사과모양 모자를 유심히 들여다보고 있는 모습, 오른쪽에는 고양이가 사과 모양 모자를 쓰고 있는 모습',
    height: '277px',
  };

  const data: HighlightProps[] = [
    {
      text: 'It’s a cat. It’s a hat.',
      highlightChar: 'a',
      color: 'red',
    },
    {
      text: 'An apple hat cat!',
      highlightChar: 'a',
      color: 'red',
    },
  ];

  return (
    <EEL01C03A04P02
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default P02;
