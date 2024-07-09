import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A08/pageData';
import EEL01C03A08P01, { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-01',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C03/A08/EE4-L01-C03-A08-P01.png',
    alt: '여자아이 두 명이 마주보며 서 있고, 한 아이가 How are you? 라고 묻고 있는 모습',
    title: '여자아이 두 명이 마주보며 서 있고, 한 아이가 How are you? 라고 묻고 있는 모습',
    width: '480px',
    height: '272px',
  };

  const text = "I'm good.";

  return (
    <EEL01C03A08P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      pageInfo={pageInfo}
      imageInfo={imageInfo}
      text={text}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
