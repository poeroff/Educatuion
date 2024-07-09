import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';

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
    src: '/L12/C03/A08/EE4-L12-C03-A08-P01.JPG',
    alt: '피아노를 치고 있는 아이의 사진',
    title: '피아노를 치고 있는 아이의 사진',
    width: '480px',
    height: '272px',
  };

  const text = 'I play the piano.';

  return (
    <EEL10C03A08P01
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
