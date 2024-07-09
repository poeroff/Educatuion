import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL10C03A06P01 from '@/Pages/EEL10C03A06P01';
import { IImageProps, IPageInfo, } from '@/Pages/EEL10C03A06P01';

const P06 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 2',
  };

  const questionInfo: IQuestionProps = {
    text: '거울에 비친 낱말을 바르게 다시 쓰고, 읽어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L10/C03/A06/EE4-L10-C03-A06-P06.JPG',
    alt: '노란색 스카프와 거울에 거꾸로 비친 글자 scarf',
    title: '노란색 스카프와 거울에 거꾸로 비친 글자 scarf',
    width: '480px',
    height: '364px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 6,
    mainKey: 6,
    subKey: 'TEXT-01',
  };

  return (
    <EEL10C03A06P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P06;
