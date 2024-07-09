import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL02C03A06P01 from '@/Pages/EEL02C03A06P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL02C03A06P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 4',
  };

  const questionInfo: IQuestionProps = {
    text: '아빠나 엄마를 소개하는 문장을 <보기> 에서 골라 쓰고, 존경하는 점을 발표해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L02/C04/A07/EE4-L02-C04-A07-P01.JPG',
    alt: '한 손으로 머리에 쓰고 있는 모자를 잡고 버스 안에서 창 밖을 보고 있는 긴 머리의 여자 한 명',
    title: '한 손으로 머리에 쓰고 있는 모자를 잡고 버스 안에서 창 밖을 보고 있는 긴 머리의 여자 한 명',
    width: '480px',
    height: '234px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'This is my dad.' }, { text: 'This is my mom.' }];

  return (
    <EEL02C03A06P01
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
