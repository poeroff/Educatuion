import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 4,
    mainKey: 4,
    subKey: 'RECORDER-01',
  };

  const imageInfo: IImageProps = {
    src: '/L12/C03/A08/EE4-L12-C03-A08-P04.JPG',
    alt: '팝콘을 먹으며 3D 안경을 쓴 채 영화를 보고 있는 아이의 사진',
    title: '팝콘을 먹으며 3D 안경을 쓴 채 영화를 보고 있는 아이의 사진',
    width: '480px',
    height: '272px',
  };

  const text = 'I watch movies.';

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

export default P04;
