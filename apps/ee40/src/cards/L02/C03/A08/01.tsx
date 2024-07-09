import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A08/pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';
import EEL01C03A08P01 from '@/Pages/EEL01C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
    size: 'large',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-01',
  };

  const imageInfo: IImageProps = {
    src: '/L02/C03/A08/EE4-L02-C03-A08-P01.JPG',
    alt: '‘I’라고 쓰여진 남자아이의 가족 사진, (1) 누나, (2) 엄마, (3) 남동생, (4) 아빠',
    title: '‘I’라고 쓰여진 남자아이의 가족 사진, (1) 누나, (2) 엄마, (3) 남동생, (4) 아빠',
    width: '480px',
    height: '272px',
  };

  const text = 'This is my sister.';

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
