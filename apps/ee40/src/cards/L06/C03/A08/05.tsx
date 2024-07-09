import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';
import EEL01C03A08P01 from '@/Pages/EEL01C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 5,
    mainKey: 5,
    subKey: 'RECORDER-05',
  };

  const imageInfo: IImageProps = {
    src: '/L06/C03/A08/EE4-L06-C03-A08-P05.JPG',
    alt: '쇼파에 앉아 책을 읽고 있는 아이의 모습',
    title: '쇼파에 앉아 책을 읽고 있는 아이의 모습',
    width: '480px',
    height: '272px',
  };

  const text = 'I’m reading a book.';

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

export default P05;
