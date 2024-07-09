import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';
import EEL01C03A08P01 from '@/Pages/EEL01C03A08P01';
import useFile from '@/utils/fileDownLoad';

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
    src: '/L09/C03/A08/EE4-L09-C03-A08-P01.JPG',
    alt: '가방이 상자 안에 있는 모습',
    title: '가방이 상자 안에 있는 모습',
    width: '480px',
    height: '272px',
  };

  const text = 'It’s in the box.';

  return (
    <EEL01C03A08P01
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