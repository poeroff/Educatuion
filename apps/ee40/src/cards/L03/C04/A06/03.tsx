import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL03C04A06P01 from '@/Pages/EEL03C04A06P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림에 알맞은 낱말을 <보기> 에서 골라 쓰고 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L03/C04/A06/EE4-L03-C04-A06-P03.JPG',
    alt: '어깨 동무를 하고 있는 소년 두 명. 화살표가 두 명 중 한 명을 가리키고 있다.',
    title: '어깨 동무를 하고 있는 소년 두 명. 화살표가 두 명 중 한 명을 가리키고 있다.',
    width: '455px',
    height: '234px',
    imgNum: 3,
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'teacher' }, { text: 'friend' }, { text: 'grandma' }];

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

export default P03;
