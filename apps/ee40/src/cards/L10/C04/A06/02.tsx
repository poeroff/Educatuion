import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL03C04A06P01 from '@/Pages/EEL03C04A06P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림에 알맞은 낱말을 <보기>에서 골라 쓰고 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L10/C04/A06/EE4-L10-C04-A06-P02.JPG',
    alt: '짧은 드레스와 긴 드레스 그림이 있고 화살표가 긴 드레스를 가리키고 있다.',
    title: '짧은 드레스와 긴 드레스 그림이 있고 화살표가 긴 드레스를 가리키고 있다.',
    width: '455px',
    height: '234px',
    imgNum: 2,
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'long' }, { text: 'short' }];

  return (
    <EEL03C04A06P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P02;