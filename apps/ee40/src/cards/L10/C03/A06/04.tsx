import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL10C03A06P01 from '@/Pages/EEL10C03A06P01';
import { IImageProps, IPageInfo, } from '@/Pages/EEL10C03A06P01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 2',
  };

  const questionInfo: IQuestionProps = {
    text: '거울에 비친 낱말을 바르게 다시 쓰고, 읽어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L10/C03/A06/EE4-L10-C03-A06-P04.JPG',
    alt: '분홍색 치마와 거울에 거꾸로 비친 글자 skirt',
    title: '분홍색 치마와 거울에 거꾸로 비친 글자 skirt',
    width: '480px',
    height: '364px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 4,
    mainKey: 4,
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

export default P03;
