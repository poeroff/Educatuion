import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A08/pageData';
import EEL01C03A08P01, { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-02',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C03/A08/EE4-L01-C03-A08-P02.png',
    alt: '벤치에 여자아이 한 명과 남자아이 한 명이 마주 보고 앉아 있고, 여자아이가 How are you? 라고 묻고 있는 모습',
    title: '벤치에 여자아이 한 명과 남자아이 한 명이 마주 보고 앉아 있고, 여자아이가 How are you? 라고 묻고 있는 모습',
    width: '480px',
    height: '272px',
  };

  const text = "I'm great.";

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

export default P02;
