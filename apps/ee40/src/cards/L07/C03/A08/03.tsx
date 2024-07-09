import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'RECORDER-03',
  };

  const imageInfo: IImageProps = {
    src: '/L07/C03/A08/EE4-L07-C03-A08-P03.JPG',
    alt: '학교에서 급식을 먹고 있는 아이들의 모습',
    title: '학교에서 급식을 먹고 있는 아이들의 모습',
    width: '310px',
    height: '272px',
  };

  const text = 'It’s time for lunch.';

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

export default P03;