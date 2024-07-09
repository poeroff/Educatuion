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
    src: '/L03/C03/A08/EE4-L03-C03-A08-P03.JPG',
    alt: '여자아이가 앉아 있고 선생님이 가르치고 있는 모습, 선생님을 가리키는 화살표',
    title: '여자아이가 앉아 있고 선생님이 가르치고 있는 모습, 선생님을 가리키는 화살표',
    width: '310px',
    height: '272px',
  };

  const text = 'She’s my teacher.';

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
