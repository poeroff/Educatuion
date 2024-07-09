import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL03C04A07P01 from '@/Pages/EEL03C04A07P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A07P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 4',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 누구인지 추측하여 <보기> 에서 골라 쓴 후 어떤 모습일지 발표해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L02/C03/A06/EE4-L02-C03-A06-P01.JPG',
    alt: '옆을 보고 있는 사람의 흑백 사진. 긴 밝은 색 머리에 프릴이 달린 모자와 목걸이를 하고 있다.',
    title: '옆을 보고 있는 사람의 흑백 사진. 긴 밝은 색 머리에 프릴이 달린 모자와 목걸이를 하고 있다.',
    width: '480px',
    height: '364px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'She’s my friend.' }, { text: 'She’s my teacher.' }, { text: 'She’s my grandma.' }];
  
  return (
    <EEL03C04A07P01
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

export default P01;
