import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL03C04A06P01 from '@/Pages/EEL03C04A06P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 3',
  };

  const questionInfo: IQuestionProps = {
    text: '사진과 일치하는 낱말을 <보기> 에서 골라 쓰고 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L04/C04/A06/EE4-L04-C04-A06-P02.jpg',
    alt: '달리고 있는 학생 사진',
    title: '달리고 있는 학생 사진',
    width: '455px',
    height: '234px',
    imgNum: 2,
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'run' }, { text: 'eat' }, { text: 'talk' }];

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