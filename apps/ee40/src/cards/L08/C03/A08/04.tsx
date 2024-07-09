import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 4,
    mainKey: 4,
    subKey: 'RECORDER-04',
  };

  const imageInfo: IImageProps = {
    src: '/L08/C03/A08/EE4-L08-C03-A08-P04.JPG',
    alt: '야구 글러브',
    title: '야구 글러브',
    width: '310px',
    height: '272px',
  };

  const text = 'I want this glove.';

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

export default P04;