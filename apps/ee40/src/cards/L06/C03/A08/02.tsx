import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';
import EEL01C03A08P01 from '@/Pages/EEL01C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-02',
  };

  const imageInfo: IImageProps = {
    src: '/L06/C03/A08/EE4-L06-C03-A08-P02.JPG',
    alt: '부엌에서 요리를 하고 있는 아이의 모습',
    title: '부엌에서 요리를 하고 있는 아이의 모습',
    width: '480px',
    height: '272px',
  };

  const text = 'I’m cooking.';

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

export default P02;
